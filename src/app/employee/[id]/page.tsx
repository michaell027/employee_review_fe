"use client";
import type { Goal } from "@/libs/interfaces/goal";
import { useEffect, useState } from "react";
import { Employee } from "@/libs/interfaces/employee";
import { useParams } from "next/navigation";
import { getEmployeeById } from "@/libs/api/employee-service";
import Loading from "@/components/loading";

export default function EmployeePage() {
  const initialReview = "";

  const goals: Goal[] = [
    {
      title: "Technical Leadership",
      description: "Lead the migration to microservices architecture",
      percentage: 85,
    },
    {
      title: "Team Development",
      description:
        "Mentor two junior developers and help them achieve their quarterly goals",
      percentage: 70,
    },
    {
      title: "Knowledge Sharing",
      description:
        "Conduct at least 4 internal workshops on advanced backend technologies",
      percentage: 50,
    },
    {
      title: "Process Improvement",
      description:
        "Implement automated testing strategy to reduce QA time by 25%",
      percentage: 30,
    },
    {
      title: "Professional Development",
      description: "Complete cloud architecture certification",
      percentage: 10,
    },
  ];

  const [user, setUser] = useState<Employee | null>(null);
  const [review, setReview] = useState<string | null>(initialReview || null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const employeeId = Number(params.id);

  useEffect(() => {
    setIsLoading(true);
    getEmployeeById(employeeId).then((data: Employee | null) => {
      if (data === null) {
        // TODO: Add error handling
        console.error("Failed to fetch employee data.");
        return;
      }
      setUser(data);
      setIsLoading(false);
    });
  }, [employeeId]);

  return (
    <section className="min-h-fit flex flex-col items-stretch text-white bg-white">
      <div className="w-full lg:px-64 clip-background items-center">
        <div aria-hidden="true" className="clip-background-color-first-holder">
          <div className="clip-background-color-first" />
        </div>
        <div aria-hidden="true" className="clip-background-color-second-holder">
          <div className="clip-background-color-second" />
        </div>
        {isLoading ? (
          <Loading />
        ) : user ? (
          <>
            <div className="bg-[#1a2035] rounded-lg shadow-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-[#776fff] flex items-center justify-center text-2xl font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-400">{user.position}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-gray-400">Department</p>
                      <p>{user.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Manager</p>
                      <p>{user.manager}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Joined</p>
                      <p>{user.join_date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Employee ID</p>
                      <p>{user.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a2035] rounded-lg shadow-xl p-6 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Performance Review</h3>
                {review ? (
                  <p className="mb-4">{review}</p>
                ) : (
                  <p className="text-gray-400 mb-4">No review generated yet.</p>
                )}
                <button
                  onClick={() =>
                    (window.location.href = `/generate?employeeId=${user.id}`)
                  }
                  className="bg-[#776fff] hover:bg-[#6258d3] px-6 py-2 rounded-md transition-colors"
                >
                  Generate Review
                </button>
              </div>
            </div>

            <div className="bg-[#1a2035] rounded-lg shadow-xl p-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Performance Goals</h3>
                <ul>
                  {goals.map((goal, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <span className="text-sm font-bold">
                          {goal.percentage}%
                        </span>
                      </div>
                      <div className="h-3 w-full bg-[#121828] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getProgressColor(goal.percentage)}`}
                          style={{ width: `${goal.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {goal.description}
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-8 gap-4">
              <button className="bg-[#312343] hover:bg-[#3e2c56] px-6 py-2 rounded-md transition-colors">
                Manage goals
              </button>
            </div>
          </>
        ) : (
          <div className="bg-[#1a2035] rounded-lg shadow-xl p-6 mb-8 text-center">
            <p>No user data available.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function getProgressColor(percentage: number): string {
  if (percentage < 30) return "bg-[#ff4694]";
  if (percentage < 70) return "bg-[#ffb74d]";
  return "bg-[#4caf50]";
}
