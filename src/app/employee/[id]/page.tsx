"use client";
import type { Goal } from "@/libs/interfaces/goal";
import { useEffect, useState, Fragment } from "react";
import { useParams } from "next/navigation";
import { getEmployeeById } from "@/libs/api/employee-service";
import type { EmployeeProfile } from "@/libs/interfaces/employee-profile";
import Link from "next/link";
import {
  Tab,
  Disclosure,
  Transition,
  TabGroup,
  TabList,
  TabPanels,
  TabPanel,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  UserCircleIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  BriefcaseIcon,
  UserGroupIcon,
  IdentificationIcon,
  ChevronUpIcon,
  PlusCircleIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import Loading from "@/components/loading";

export default function EmployeePage() {
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

  const [user, setUser] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const employeeId = Number(params.id);

  useEffect(() => {
    setIsLoading(true);
    getEmployeeById(employeeId).then((data: EmployeeProfile | null) => {
      if (data === null) {
        setIsLoading(false);
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

        <Transition
          show={!isLoading && !!user}
          as={Fragment}
          enter="transform transition duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="z-10">
            {user && (
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
                      <h2 className="text-2xl font-bold flex items-center">
                        <UserCircleIcon className="w-6 h-6 mr-2" />
                        {user.name}
                      </h2>
                      <p className="text-gray-400 flex items-center">
                        <BriefcaseIcon className="w-4 h-4 mr-2" />
                        {user.position}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-gray-400 flex items-center">
                            <UserGroupIcon className="w-4 h-4 mr-2" />
                            Department
                          </p>
                          <p>{user.department}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 flex items-center">
                            <UserCircleIcon className="w-4 h-4 mr-2" />
                            Manager
                          </p>
                          <p>{user.manager}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Joined
                          </p>
                          <p>{formatDate(user.join_date)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 flex items-center">
                            <IdentificationIcon className="w-4 h-4 mr-2" />
                            Employee ID
                          </p>
                          <p>{user.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <TabGroup>
                  <TabList className="flex space-x-1 rounded-xl bg-[#121828] p-1 mb-4">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center justify-center
                            ${selected ? "bg-[#776fff] text-white" : "text-gray-400 hover:bg-[#1a2035] hover:text-white"}`}
                        >
                          <DocumentTextIcon className="w-5 h-5 mr-2" />
                          Performance Review
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center justify-center
                            ${selected ? "bg-[#776fff] text-white" : "text-gray-400 hover:bg-[#1a2035] hover:text-white"}`}
                        >
                          <ChartBarIcon className="w-5 h-5 mr-2" />
                          Performance Goals
                        </button>
                      )}
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel className="bg-[#1a2035] rounded-lg shadow-xl p-6 mb-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <DocumentTextIcon className="w-5 h-5 mr-2" />
                          Performance Review
                        </h3>
                        {user.review && user.review.content ? (
                          <p className="mb-4">{user.review.content}</p>
                        ) : (
                          <>
                            <p className="text-gray-400 mb-4">
                              No review generated yet.
                            </p>
                            <Link
                              href={`/generate?employeeId=${user.id}`}
                              className="bg-[#776fff] hover:bg-[#6258d3] px-6 py-3 rounded-md transition-colors flex items-center w-fit"
                            >
                              <PlusCircleIcon className="w-5 h-5 mr-2" />
                              Generate Review
                            </Link>
                          </>
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel className="bg-[#1a2035] rounded-lg shadow-xl p-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <ChartBarIcon className="w-5 h-5 mr-2" />
                          Performance Goals
                        </h3>
                        <ul className="space-y-4">
                          {goals.map((goal, index) => (
                            <Disclosure key={index} as="div">
                              {({ open }) => (
                                <>
                                  <DisclosureButton className="flex w-full justify-between rounded-lg bg-[#121828] px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-[#776fff]">
                                    <div className="flex items-center">
                                      <span>{goal.title}</span>
                                      <span className="ml-2 bg-[#776fff] text-white text-xs px-2 py-1 rounded-full">
                                        {goal.percentage}%
                                      </span>
                                    </div>
                                    <ChevronUpIcon
                                      className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-white`}
                                    />
                                  </DisclosureButton>
                                  <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                  >
                                    <DisclosurePanel className="px-4 pt-4 pb-2">
                                      <div className="h-3 w-full bg-[#121828] rounded-full overflow-hidden mb-2">
                                        <div
                                          className={`h-full rounded-full ${getProgressColor(goal.percentage)} transition-all duration-500 ease-in-out`}
                                          style={{
                                            width: `${goal.percentage}%`,
                                          }}
                                        ></div>
                                      </div>
                                      <p className="text-sm text-gray-400">
                                        {goal.description}
                                      </p>
                                    </DisclosurePanel>
                                  </Transition>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-end mt-8 gap-4">
                        <button className="bg-[#312343] hover:bg-[#3e2c56] px-6 py-2 rounded-md transition-colors flex items-center">
                          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                          Manage goals
                        </button>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </>
            )}
          </div>
        </Transition>

        <Transition
          show={isLoading}
          as={Fragment}
          enter="transform transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="py-10">
            <Loading />
          </div>
        </Transition>

        <Transition
          show={!isLoading && !user}
          as={Fragment}
          enter="transform transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-[#1a2035] rounded-lg shadow-xl p-6 mb-8 text-center">
            <p>No user data available.</p>
          </div>
        </Transition>
      </div>
    </section>
  );
}

function getProgressColor(percentage: number): string {
  if (percentage < 30) return "bg-[#ff4694]";
  if (percentage < 70) return "bg-[#ffb74d]";
  return "bg-[#4caf50]";
}

function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
