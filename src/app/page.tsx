"use client";

import { Divider } from "@/components/divider";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const steppers = [
  { name: "Select employee", href: "#" },
  { name: "Answer questions", href: "#" },
  { name: "Generate review", href: "#" },
  { name: "Send review", href: "generate" },
];

export default function Example() {
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
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {steppers.map((step, index) => (
              <div key={step.name} className="flex items-center justify-center">
                <p>{step.name}</p>

                {index < steppers.length - 1 && (
                  <span className="pl-2 flex items-center" aria-hidden="true">
                    <ArrowLongRightIcon className="w-6" />
                  </span>
                )}
              </div>
            ))}
          </div>
          <Link
            href="/employee"
            className="bg-[#776fff] w-fit hover:bg-[#6258d3] flex gap-2 px-6 py-2 my-10 rounded-md transition-colors"
          >
            <ArrowLongRightIcon className="w-6" /> Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
