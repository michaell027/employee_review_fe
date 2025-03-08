"use client";

import State from "@/libs/enums/state";
import ErrorComponent from "@/components/error";
import Chat from "@/components/chat";
import LineDivider from "@/components/line-divider";

interface ReviewHandlerProps {
  state: State;
  generatedReview: string;
  handleRequestChanges: () => void;
  error: string;
  handleSaveReview: (updatedReview?: string) => void; // Update the type to accept an optional parameter
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
      <p className="text-xl my-6">
        Here is the generated review. You can send it as is or request changes.
      </p>
      <LineDivider />
      {state === State.SavingReviewError && (
        <div className="flex w-full flex-col my-10 space-y-4 items-center justify-center">
          <ErrorComponent message={error} />
        </div>
      )}
      {state === State.GeneratingReviewError && (
        <div className="flex w-full flex-col my-10 space-y-4 items-center justify-center">
          <ErrorComponent message={error} />
        </div>
      )}
      {state === State.ReviewGenerated && (
        <div className="flex flex-col mt-6 w-full">
          <div className="bg-[#121828] text-white text-lg shadow-2xl px-4 py-3 rounded-md">
            {generatedReview}
          </div>
          <div className="mt-4 gap-3 flex justify-end">
            <button
              onClick={handleRequestChanges}
              className="bg-[#ff4694] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#d93a7c] transition-colors"
            >
              Request Changes
            </button>
            <button
              onClick={() => handleSaveReview()}
              className="bg-[#776fff] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#5a54cc] transition-colors"
            >
              Send Review
            </button>
          </div>
        </div>
      )}
      {state === State.Chatting && (
        <Chat review={generatedReview} onSaveReview={onSaveReview} />
      )}
    </div>
  );
}
