"use client";

import Link from "next/link";
import LineDivider from "@/components/line-divider";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface ReviewSuccessProps {
  employeeId: number;
  generatedReview: string;
}

export default function ReviewSuccess({
  employeeId,
  generatedReview,
}: ReviewSuccessProps) {
  return (
    <div className="flex flex-col">
      <LineDivider />

      <Transition
        as={Fragment}
        appear={true}
        show={true}
        enter="transform transition duration-500"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="my-6">
          <div className="bg-[#1a2035] rounded-lg shadow-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2 items-center">
                <CheckCircleIcon className="h-5 w-5 text-[#4caf50]" />
                <span className="text-sm text-white">Saved Review</span>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              {generatedReview}
            </div>
          </div>

          <div className="mt-4 gap-4 flex justify-end">
            <Link
              href="/employee"
              className="inline-flex items-center bg-[#312343] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#3e2c56] focus:outline-none focus:ring-2 focus:ring-[#776fff] focus:ring-offset-2 focus:ring-offset-[#1a2035] transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Return to Dashboard
            </Link>
            <Link
              href={`/employee/${employeeId}`}
              className="inline-flex items-center bg-[#776fff] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#6258d3] focus:outline-none focus:ring-2 focus:ring-[#776fff] focus:ring-offset-2 focus:ring-offset-[#1a2035] transition-colors duration-200"
            >
              <UserCircleIcon className="h-5 w-5 mr-2" />
              View Employee Profile
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
}
