import { Question } from "@/libs/types/question";
import { useForm } from "react-hook-form";
import State from "@/libs/enums/state";
import { Evaluation } from "@/libs/interfaces/evaluation";

interface QuestionsFormProps {
  state: State;
  generatedQuestions: Question[];
  handleGenerateReview: (evaluation: Evaluation) => void;
}

export default function QuestionsForm({
  state,
  generatedQuestions,
  handleGenerateReview,
}: QuestionsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: Record<string, string>) => {
    const evaluation: Evaluation = {
      evaluation: generatedQuestions.map((q, idx) => ({
        question: q,
        answer: data[`question_${idx}`] || "",
      })),
    };

    handleGenerateReview(evaluation);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {generatedQuestions.map((q, idx) => (
        <div key={idx}>
          <p className="text-lg mt-6 mb-2">{q}</p>
          <div className="pb-2">
            <textarea
              id={`question_${idx}`}
              placeholder="Enter your response here..."
              rows={2}
              className={`block text-black w-full p-2 rounded-md ${errors[`question_${idx}`] ? "border-red-500" : ""}`}
              {...register(`question_${idx}`, {
                required: "This field is required",
              })}
            />
            {errors[`question_${idx}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`question_${idx}`]?.message as string}
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="flex mt-6 justify-start">
        <div className="text-white px-1 rounded-md mr-4">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            className={`size-10 ${state !== State.GeneratingReview ? "animate-bounce-horizontal" : ""}`}
          >
            <path
              d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="bg-white mb-8 text-black px-4 py-2 rounded-md"
          disabled={state === State.GeneratingReview}
        >
          {state === State.GeneratingReview
            ? "Generating..."
            : "Generate Review"}
        </button>
      </div>
    </form>
  );
}
