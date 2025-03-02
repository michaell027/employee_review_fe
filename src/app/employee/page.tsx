"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllEmployees } from "@/libs/api/employee-service";
import Loading from "@/components/loading";
import Error from "@/components/error";
import { Employee } from "@/libs/interfaces/employee";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    getAllEmployees().then((data) => {
      if (data === null) {
        setError("Failed to fetch employees.");
        setLoading(false);
        return;
      } else if (data.length === 0) {
        setError("No employees found.");
        setLoading(false);
        return;
      }
      setLoading(false);
      setEmployees(data);
    });

    return () => {
      setEmployees([]);
    };
  }, []);

  return (
    <section className="min-h-fit flex flex-col items-stretch text-white bg-white">
      <div className="lg:flex w-full lg:px-64 clip-background items-center">
        <div aria-hidden="true" className="clip-background-color-first-holder">
          <div className="clip-background-color-first" />
        </div>
        <div aria-hidden="true" className="clip-background-color-second-holder">
          <div className="clip-background-color-second" />
        </div>
        <div className="w-full flex flex-col items-center justify-center z-10">
          <div className="px-4 py-8 w-full bg-[#121828] rounded-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">Team Members</h3>
            </div>
            <div className="flow-root">
              {loading ? (
                <Loading />
              ) : employees.length === 0 ? (
                <div className="flex w-full flex-col my-5 space-y-4 items-center justify-center">
                  <Error message={error} />
                </div>
              ) : (
                <ul role="list" className="divide-y divide-gray-700">
                  {employees.map((employee, index) => (
                    <li key={employee.id || index} className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          className="rounded-full"
                          src="/profile-picture.jpg"
                          alt={`${employee.name} profile picture`}
                          width={32}
                          height={32}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-lg truncate text-white m-0">
                            {employee.name}
                          </p>
                          <p className="text-sm truncate text-white m-0">
                            {employee.position}
                          </p>
                        </div>
                        <div className="inline-flex gap-3 items-center text-base font-semibold text-white">
                          <button
                            disabled
                            className="flex border-2 bg-[#312343] border-[#312343] px-2 py-1 rounded-md text-sm"
                          >
                            Review sent
                          </button>
                          <button
                            onClick={() =>
                              (window.location.href = `/generate?employeeId=${employee.id}`)
                            }
                            className="flex border-2 border-green-800 bg-green-800 px-2 py-1 rounded-md text-sm"
                          >
                            Send review
                          </button>
                          <button
                            onClick={() =>
                              (window.location.href = `/profile/${employee.id}`)
                            }
                            className="flex border-2 border-[#776fff] bg-[#776fff] px-2 py-1 rounded-md text-sm hover:bg-purple-700 hover:border-purple-700 transition-colors"
                          >
                            View profile
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
