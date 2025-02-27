"use client";
import { useEffect, useState } from "react";
import OllamaFooter from "@/components/ollama-footer";
import Loading from "@/components/loading";
import LineDivider from "@/components/line-divider";
import { Question } from "@/libs/types/question";
import { getQuestionsByEmployeeId } from "@/libs/api/questions-service";
import Error from "@/components/error";
import QuestionsForm from "@/components/questions-form";
import ReviewHandler from "@/components/review-handler";
import State from "@/libs/enums/state";
import { Evaluation } from "@/libs/interfaces/evaluation";
import { getReviewBasedOnEvaluation } from "@/libs/api/review-service";
import { Review } from "@/libs/types/review";

export default function Generate() {
  const [state, setState] = useState<State>(State.LoadingQuestions);
  const [generatedReview, setGeneratedReview] = useState<string>("");
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string>("");

  const employeeId = 1;

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!employeeId) {
        setError("Employee ID not found.");
        setState(State.GeneratingQuestionsError);
        return;
      }
      const data: Question[] | null =
        await getQuestionsByEmployeeId(employeeId);

      if (data === null) {
        setError("Failed to generate questions.");
        setState(State.GeneratingQuestionsError);
        return;
      }
      setGeneratedQuestions(data);
      setState(State.QuestionsLoaded);
    };

    fetchQuestions().then(() => {});
  }, [employeeId]);

  const handleGenerateReview = async (evaluation: Evaluation) => {
    if (evaluation.evaluation.length !== generatedQuestions.length) {
      console.error("Invalid evaluation data.");
      return;
    }
    setState(State.GeneratingReview);

    getReviewBasedOnEvaluation(evaluation).then((data: Review | null) => {
      if (data === null) {
        setError("Failed to generate review.");
        setState(State.GeneratingReviewError);
        return;
      }

      setGeneratedReview(data);
      setState(State.ReviewGenerated);
    });
  };

  const handleRequestChanges = () => {
    setState(State.Chatting);
  };

  return (
    <section
      suppressHydrationWarning={true}
      className="min-h-fit flex flex-col items-stretch text-white bg-white"
    >
      <div className="lg:flex w-full lg:px-64 clip-background items-center">
        <div aria-hidden="true" className="clip-background-color-first-holder">
          <div className="clip-background-color-first" />
        </div>
        <div aria-hidden="true" className="clip-background-color-second-holder">
          <div className="clip-background-color-second" />
        </div>
        <div className="w-full px-24 z-10">
          {(state === State.LoadingQuestions ||
            state === State.QuestionsLoaded ||
            state === State.GeneratingReview ||
            state === State.GeneratingQuestionsError) && (
            <>
              <h1 className="text-4xl font-bold text-left tracking-wide">
                Keep your team on track...
              </h1>
              <p className="mt-8 text-xl my-6">
                Please respond to the questions about your employee to generate
                a review, then click the button below.
              </p>
              <LineDivider />
              {state === State.GeneratingQuestionsError && (
                <div className="flex w-full flex-col my-10 space-y-4 items-center justify-center">
                  <Error message={error} />
                </div>
              )}
              {state === State.LoadingQuestions && <Loading />}
              {(state === State.QuestionsLoaded ||
                state === State.GeneratingReview) && (
                <QuestionsForm
                  state={state}
                  generatedQuestions={generatedQuestions}
                  handleGenerateReview={handleGenerateReview}
                />
              )}
            </>
          )}
          {(state === State.ReviewGenerated || state === State.Chatting) && (
            <ReviewHandler
              state={state}
              generatedReview={generatedReview}
              handleRequestChanges={handleRequestChanges}
            />
          )}
          <LineDivider />
          <OllamaFooter />
        </div>
      </div>
    </section>
  );
}
