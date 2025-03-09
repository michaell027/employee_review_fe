"use client";

import State from "@/libs/enums/state";
import ErrorComponent from "@/components/error";
import Chat from "@/components/chat";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import LineDivider from "@/components/line-divider";

interface ReviewHandlerProps {
  state: State;
  generatedReview: string;
  handleRequestChanges: () => void;
  error: string;
  handleSaveReview: (updatedReview?: string) => void;
}

export default function ReviewHandler({
  state,
  generatedReview,
  handleRequestChanges,
  error,
  handleSaveReview,
}: ReviewHandlerProps) {
  const onSaveReview = (updatedReview: string) => {
    handleSaveReview(updatedReview);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-xl font-medium text-white">
          Here is the generated review. You can send it as is or request
          changes.
        </h2>
      </div>

      <LineDivider />

      {(state === State.SavingReviewError ||
        state === State.GeneratingReviewError) && (
        <div className="flex w-full flex-col my-10 space-y-4 items-center justify-center">
          <ErrorComponent message={error} />
        </div>
      )}

      {state === State.ReviewGenerated && (
        <Transition
          show={true}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="flex flex-col my-6 w-full">
            <div className="bg-[#1a2035] text-white text-lg shadow-xl px-5 py-5 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-5 w-5 mr-2 text-white" />
                  <span className="text-sm text-white">Generated Review</span>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                {generatedReview}
              </div>
            </div>

            <div className="mt-8 gap-4 flex justify-end">
              <button
                onClick={handleRequestChanges}
                className="inline-flex items-center bg-[#312343] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#3e2c56] focus:outline-none focus:ring-2 focus:ring-[#776fff] focus:ring-offset-2 focus:ring-offset-[#1a2035] transition-colors duration-200"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Request Changes
              </button>
              <button
                onClick={() => handleSaveReview()}
                className="inline-flex items-center bg-[#776fff] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#6258d3] focus:outline-none focus:ring-2 focus:ring-[#776fff] focus:ring-offset-2 focus:ring-offset-[#1a2035] transition-colors duration-200"
              >
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Send Review
              </button>
            </div>
          </div>
        </Transition>
      )}

      {state === State.Chatting && (
        <Chat review={generatedReview} onSaveReview={onSaveReview} />
      )}
    </div>
  );
}
