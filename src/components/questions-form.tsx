"use client";

import type { Question } from "@/libs/types/question";
import { useForm } from "react-hook-form";
import State from "@/libs/enums/state";
import type { Evaluation } from "@/libs/interfaces/evaluation";
import {
  DocumentTextIcon,
  SparklesIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 my-8">
      {generatedQuestions.map((q, idx) => (
        <div key={idx} className="bg-[#1a2035] rounded-lg p-5 shadow-xl">
          <div className="flex items-start mb-3">
            <DocumentTextIcon className="h-6 w-6 text-white mr-2 mt-1 flex-shrink-0" />
            <h3 className="text-lg font-medium text-white">{q}</h3>
          </div>

          <div className="mt-4">
            <div className="relative">
              <textarea
                id={`question_${idx}`}
                placeholder="Enter your response here..."
                rows={3}
                className={`block w-full p-3 bg-[#121828] text-white rounded-lg border-2 ${
                  errors[`question_${idx}`]
                    ? "border-red-500"
                    : "border-[#312343]"
                } focus:outline-none focus:border-[#776fff] transition-colors duration-200`}
                {...register(`question_${idx}`, {
                  required: "This field is required",
                })}
              />

              {errors[`question_${idx}`] && (
                <div className="flex items-center mt-2 text-[#ff4694]">
                  <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                  <p className="text-sm">
                    {errors[`question_${idx}`]?.message as string}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-start mt-8">
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 bg-[#776fff] hover:bg-[#6258d3] text-white rounded-lg font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-[#776fff] focus:ring-offset-2 focus:ring-offset-[#1a2035] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          disabled={state === State.GeneratingReview}
        >
          {state === State.GeneratingReview ? (
            <>
              <SparklesIcon className="h-5 w-5 mr-2 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              Generate Review
            </>
          )}
        </button>
      </div>
    </form>
  );
}
