"use client";
import type { Goal } from "@/libs/interfaces/goal";
import { useState } from "react";
import { Employee } from "@/libs/interfaces/employee";

export default function EmployeePage() {
  const user: Employee = {
    id: "EMP-2023-0042",
    name: "Jana Nováková",
    position: "Senior Software Developer",
    department: "Engineering",
    manager: "Martin Kováč",
    joinDate: "March 15, 2020",
    birthday: "January 10, 1985",
    email: "jana@novak.com",
  };

  const initialReview = "";

  //   const review = `Jana has consistently demonstrated exceptional technical skills and problem-solving abilities throughout this review period. Her contributions to the backend infrastructure project were instrumental in its successful delivery ahead of schedule.
  //
  // She shows great initiative in mentoring junior team members and has received positive feedback from her peers. Jana's communication skills have improved significantly, allowing her to effectively collaborate with cross-functional teams.
  //
  // Areas for improvement include delegation of tasks and work-life balance. Jana tends to take on too much responsibility rather than distributing work among team members. We've discussed strategies to address this in the coming months.
  //
  // Overall, Jana's performance exceeds expectations, and she continues to be a valuable asset to the engineering department.`;

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

  const [review, setReview] = useState<string | null>(initialReview || null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReview = async () => {
    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setReview(
        "This is a generated review for " +
          user.name +
          ". The actual content would be fetched from your backend or AI service.",
      );
    } catch (error) {
      console.error("Failed to generate review:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="min-h-fit flex flex-col items-stretch text-white bg-white">
      <div className="w-full lg:px-64 clip-background items-center">
        <div aria-hidden="true" className="clip-background-color-first-holder">
          <div className="clip-background-color-first" />
        </div>
        <div aria-hidden="true" className="clip-background-color-second-holder">
          <div className="clip-background-color-second" />
        </div>
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
                  <p>{user.joinDate}</p>
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
          <h3 className="text-xl font-semibold mb-4">Performance Review</h3>
          {review ? (
            <div className="bg-[#121828] p-4 rounded-md">
              <p className="whitespace-pre-line">{review}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-[#121828] p-8 rounded-md">
              <p className="mb-4 text-center">No review available yet.</p>
              <button
                onClick={handleGenerateReview}
                disabled={isGenerating}
                className={`bg-[#776fff] hover:bg-[#5a54cc] px-6 py-2 rounded-md transition-colors ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isGenerating ? "Generating..." : "Generate Review"}
              </button>
            </div>
          )}
        </div>

        <div className="bg-[#1a2035] rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Performance Goals</h3>
          <div className="space-y-6">
            {goals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className="text-sm font-bold">{goal.percentage}%</span>
                </div>
                <div className="h-3 w-full bg-[#121828] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getProgressColor(goal.percentage)}`}
                    style={{ width: `${goal.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button className="bg-[#312343] hover:bg-[#3e2c56] px-6 py-2 rounded-md transition-colors">
            Manage goals
          </button>
        </div>
      </div>
    </section>
  );
}

function getProgressColor(percentage: number): string {
  if (percentage < 30) return "bg-[#ff4694]";
  if (percentage < 70) return "bg-[#ffb74d]";
  return "bg-[#4caf50]";
}
