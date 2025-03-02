import LineDivider from "@/components/line-divider";
import Chat from "@/components/chat";
import State from "@/libs/enums/state";
import Error from "@/components/error";

interface ReviewHandlerProps {
  state: State;
  generatedReview: string;
  handleRequestChanges: () => void;
  error: string;
}

export default function ReviewHandler({
  state,
  generatedReview,
  handleRequestChanges,
  error,
}: ReviewHandlerProps) {
  return (
    <>
      <h1 className="text-2xl font-bold text-left tracking-wide">
        Generated review:
      </h1>
      <p className="text-lg my-8">
        Here&#39;s the generated review for your employee. If you want to make
        changes, use the &#39;Request Changes&#39; button below the review and
        start a chat with the AI model.
      </p>
      <LineDivider />
      {state === State.Chatting && <Chat review={generatedReview} />}
      {state === State.GeneratingReviewError && (
        <div className="flex w-full flex-col my-10 space-y-4 items-center justify-center">
          <Error message={error} />
        </div>
      )}
      {state === State.ReviewGenerated && (
        <>
          <div className="min-h-40 mt-10 rounded-md bg-[#121828] relative">
            <div className="p-4">
              <p>{generatedReview}</p>
            </div>
          </div>
          <div className="mt-4 gap-3 flex justify-end">
            <button
              onClick={handleRequestChanges}
              className="bg-[#ff4694] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#d93a7c] transition-colors"
            >
              Request Changes
            </button>
            <button
              onClick={handleRequestChanges}
              className="bg-[#776fff] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#5a54cc] transition-colors"
            >
              Accept & Send
            </button>
          </div>
        </>
      )}
    </>
  );
}
