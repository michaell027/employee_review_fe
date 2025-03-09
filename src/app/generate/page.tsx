"use client";
import { useEffect, useState, Fragment } from "react";
import OllamaFooter from "@/components/ollama-footer";
import Loading from "@/components/loading";
import LineDivider from "@/components/line-divider";
import type { Question } from "@/libs/types/question";
import { getQuestionsByEmployeeId } from "@/libs/api/questions-service";
import QuestionsForm from "@/components/questions-form";
import ReviewHandler from "@/components/review-handler";
import State from "@/libs/enums/state";
import type { Evaluation } from "@/libs/interfaces/evaluation";
import {
  getReviewBasedOnEvaluation,
  saveReview,
} from "@/libs/api/review-service";
import type { Review } from "@/libs/types/review";
import { useSearchParams } from "next/navigation";
import { useManager } from "@/libs/context/manager-context";
import ReviewSuccess from "@/components/review-success";
import { Transition } from "@headlessui/react";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import ErrorComponent from "@/components/error";

export default function Generate() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<State>(State.LoadingQuestions);
  const [generatedReview, setGeneratedReview] = useState<string>("");
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string>("");
  const employeeId = Number(searchParams.get("employeeId"));
  const { selectedManager } = useManager();

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
      setError("You must answer all questions.");
      setState(State.GeneratingReviewError);
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

  const handleSaveReview = async (updatedReview?: string) => {
    const managerId = selectedManager?.id;
    if (!managerId) {
      setError("Manager ID not found.");
      setState(State.SavingReviewError);
      return;
    }

    const reviewToSave = updatedReview || generatedReview;

    saveReview(reviewToSave, employeeId, managerId).then(
      (data: Review | null) => {
        if (data === null) {
          setError("Failed to save review.");
          setState(State.SavingReviewError);
          return;
        }
        if (updatedReview) {
          setGeneratedReview(updatedReview);
        }
        setState(State.ReviewSent);
      },
    );
  };

  const handleRequestChanges = () => {
    setState(State.Chatting);
  };

  const renderStateIcon = () => {
    switch (state) {
      case State.LoadingQuestions:
        return <ArrowPathIcon className="w-8 h-8 text-[#776fff]" />;
      case State.QuestionsLoaded:
        return <ClipboardDocumentListIcon className="w-8 h-8 text-[#776fff]" />;
      case State.GeneratingReview:
        return <ArrowPathIcon className="w-8 h-8 text-[#776fff]" />;
      case State.ReviewGenerated:
        return (
          <ClipboardDocumentCheckIcon className="w-8 h-8 text-[#776fff]" />
        );
      case State.Chatting:
        return <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#776fff]" />;
      case State.ReviewSent:
        return <CheckCircleIcon className="w-8 h-8 text-green-500" />;
      default:
        return <UserGroupIcon className="w-8 h-8 text-[#776fff]" />;
    }
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
          <div className="flex items-center mb-6">
            {renderStateIcon()}
            <h1 className="text-4xl font-bold text-left tracking-wide ml-3">
              {state === State.ReviewSent
                ? "Review sent successfully!"
                : "Let's generate a review"}
            </h1>
          </div>

          <Transition
            show={
              state === State.ReviewSent || state === State.SavingReviewError
            }
            as={Fragment}
            enter="transform transition duration-500 ease-in-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div>
              <p className="mt-8 text-xl my-6">
                Your review has been sent to the employee. You can now return to
                the dashboard or view the employee&#39;s profile.
              </p>
              <LineDivider />
              {state === State.SavingReviewError ? (
                <div className="flex items-center justify-center my-12">
                  <ErrorComponent message={error} />
                </div>
              ) : (
                <ReviewSuccess
                  employeeId={employeeId}
                  generatedReview={generatedReview}
                />
              )}
            </div>
          </Transition>

          <Transition
            show={
              state === State.LoadingQuestions ||
              state === State.QuestionsLoaded ||
              state === State.GeneratingReview ||
              state === State.GeneratingQuestionsError
            }
            as={Fragment}
            enter="transform transition duration-500 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>
              <p className="mt-8 text-xl my-6">
                Please respond to the questions about your employee to generate
                a review, then click the button below.
              </p>
              <LineDivider />
              {state === State.LoadingQuestions && <Loading />}
              {(state === State.QuestionsLoaded ||
                state === State.GeneratingReview) && (
                <QuestionsForm
                  state={state}
                  generatedQuestions={generatedQuestions}
                  handleGenerateReview={handleGenerateReview}
                />
              )}
              {state === State.GeneratingQuestionsError && (
                <div className="flex items-center justify-center my-12">
                  <ErrorComponent message={error} />
                </div>
              )}
            </div>
          </Transition>

          <Transition
            show={
              state === State.ReviewGenerated ||
              state === State.Chatting ||
              state === State.GeneratingReviewError
            }
            as={Fragment}
            enter="transform transition duration-500 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>
              <ReviewHandler
                state={state}
                generatedReview={generatedReview}
                handleRequestChanges={handleRequestChanges}
                error={error}
                handleSaveReview={handleSaveReview}
              />
            </div>
          </Transition>

          <LineDivider />
          <OllamaFooter />
        </div>
      </div>
    </section>
  );
}
