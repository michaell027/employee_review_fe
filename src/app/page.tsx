"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Divider } from "@/components/divider";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import {
  ArrowLongRightIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const steps = [
  { name: "Select employee", icon: UserIcon },
  { name: "Answer questions", icon: QuestionMarkCircleIcon },
  { name: "Generate review", icon: DocumentTextIcon },
  { name: "Send review", icon: PaperAirplaneIcon },
];

export default function HomePage() {
  return (
    <div className="clip-background">
      <div aria-hidden="true" className="clip-background-color-first-holder">
        <div className="clip-background-color-first" />
      </div>
      <div aria-hidden="true" className="clip-background-color-second-holder">
        <div className="clip-background-color-second" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-white">Streamline Your Team Management</h2>
          <p className="text-gray-300">
            Save time and simplify the employee review process. Our application
            allows you to quickly create personalized reviews for your employees
            based on their roles. Simply answer a few straightforward questions,
            and let our technology handle the rest.
          </p>
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Divider />
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <TabGroup>
            <TabList className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {steps.map((step, index) => (
                <Tab as={Fragment} key={step.name}>
                  <div className="flex items-center justify-center focus:outline-none">
                    <step.icon className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span>{step.name}</span>

                    {index < steps.length - 1 && (
                      <span
                        className="pl-2 flex items-center"
                        aria-hidden="true"
                      >
                        <ArrowLongRightIcon className="w-6" />
                      </span>
                    )}
                  </div>
                </Tab>
              ))}
            </TabList>
          </TabGroup>

          <Transition
            as={Fragment}
            show={true}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Link
              href="/employee"
              className="bg-[#776fff] w-fit hover:bg-[#6258d3] flex gap-2 px-6 py-2 my-10 rounded-md transition-colors"
            >
              <ArrowLongRightIcon className="w-6" /> Get Started
            </Link>
          </Transition>
        </div>
      </div>
    </div>
  );
}
