"use client";

import { useEffect, useState, Fragment } from "react";
import { getManagerEmployees } from "@/libs/api/employee-service";
import Image from "next/image";
import Loading from "@/components/loading";
import ErrorComponent from "@/components/error";
import type { Employee } from "@/libs/interfaces/employee";
import { useManager } from "@/libs/context/manager-context";
import { Transition } from "@headlessui/react";
import {
  UserGroupIcon,
  UserIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { selectedManager, isLoadingManager } = useManager();

  useEffect(() => {
    if (isLoadingManager) return;

    if (!selectedManager) {
      setError("No manager selected");
      return;
    }

    setLoading(true);
    getManagerEmployees(selectedManager.id).then((data: Employee[] | null) => {
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
  }, [selectedManager, isLoadingManager]);

  const renderContent = () => {
    if (!selectedManager) {
      return (
        <div className="flex w-full flex-col space-y-4 items-center justify-center p-8 text-center">
          <ErrorComponent
            message={
              "No manager selected, please select your test manager in the top right corner"
            }
          />
        </div>
      );
    }

    if (loading) {
      return <Loading />;
    }

    if (employees.length === 0) {
      return (
        <div className="flex w-full flex-col my-5 space-y-4 items-center justify-center">
          <ErrorComponent message={error} />
        </div>
      );
    }

    return (
      <ul role="list" className="divide-y divide-gray-700">
        {employees.map((employee, index) => (
          <li key={employee.id || index} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  className="rounded-full"
                  src="/profile-picture.jpg"
                  alt={`${employee.name} profile picture`}
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg truncate text-white m-0">
                  {employee.name}
                </p>
                <p className="text-sm truncate text-white m-0">
                  {employee.position}
                </p>
              </div>
              <div className="inline-flex gap-3 items-center text-base font-semibold text-white">
                {employee.is_review_generated ? (
                  <button
                    disabled
                    className="flex items-center border-2 bg-[#312343] border-[#312343] px-2 py-1 rounded-md text-sm"
                  >
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    Review sent
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      (window.location.href = `/generate?employeeId=${employee.id}`)
                    }
                    className="flex items-center border-2 border-green-800 bg-green-800 px-2 py-1 rounded-md text-sm"
                  >
                    <PaperAirplaneIcon className="w-4 h-4 mr-1" />
                    Send review
                  </button>
                )}
                <button
                  onClick={() =>
                    (window.location.href = `/employee/${employee.id}`)
                  }
                  className="flex items-center border-2 border-[#776fff] bg-[#776fff] px-2 py-1 rounded-md text-sm hover:bg-purple-700 hover:border-purple-700 transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-1" />
                  View profile
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="min-h-fit flex flex-col items-stretch text-white bg-white">
      <div className="lg:flex w-full lg:px-64 clip-background items-center">
        <div aria-hidden="true" className="clip-background-color-first-holder">
          <div className="clip-background-color-first" />
        </div>
        <div aria-hidden="true" className="clip-background-color-second-holder">
          <div className="clip-background-color-second" />
        </div>
        <Transition
          as={Fragment}
          show={true}
          enter="transform transition duration-500"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="w-full flex flex-col items-center justify-center z-10">
            <div className="px-4 py-8 w-full bg-[#121828] rounded-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <UserGroupIcon className="w-6 h-6 mr-2" />
                  Team Members
                </h3>
              </div>
              <div className="flow-root">
                {isLoadingManager ? <Loading /> : renderContent()}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>
  );
}
