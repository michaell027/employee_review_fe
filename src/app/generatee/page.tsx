"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

enum State {
  LoadingQuestions = 0,
  QuestionsLoaded = 1,
  GeneratingReview = 2,
  ReviewGenerated = 3,
}

const questions = [
  {
    question: "What is the employee's name?",
    placeholder: "Here write your response...",
  },
  {
    question: "What is the employee's role?",
    placeholder: "Here write your response...",
  },
  {
    question: "What are the employee's responsibilities?",
    placeholder: "Here write your response...",
  },
  {
    question: "What are the employee's strengths?",
    placeholder: "Here write your response...",
  },
  {
    question: "What are the employee's weaknesses?",
    placeholder: "Here write your response...",
  },
];

export default function Generate() {
  const [state, setState] = useState<State>(State.LoadingQuestions);
  const [generatedReview, setGeneratedReview] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(State.QuestionsLoaded);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateReview = () => {
    setState(State.GeneratingReview);
    setTimeout(() => {
      setGeneratedReview(
        "This is a sample generated review for the employee. It highlights their performance, strengths, and areas for improvement based on the provided information.",
      );
      setState(State.ReviewGenerated);
    }, 2000);
  };

  const handleRequestChanges = () => {
    alert("Change request submitted. The review will be regenerated shortly.");
  };

  return (
    <section className="min-h-fit flex flex-col items-stretch text-white bg-white">
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
            state === State.GeneratingReview) && (
            <>
              <h1 className="text-4xl font-bold text-left tracking-wide">
                Keep your team on track...
              </h1>
              <p className="text-xl my-6">
                Please respond to the questions about your employee to generate
                a review, then click the button below.
              </p>
              <div className="h-0.5 bg-white"></div>
              {state === State.LoadingQuestions && (
                <div className="flex items-center justify-center my-24">
                  <div className="rounded-md h-14 w-14 border-4 border-t-4 white animate-spin"></div>
                </div>
              )}
              {(state === State.QuestionsLoaded ||
                state === State.GeneratingReview) && (
                <>
                  {questions.map((q, idx) => (
                    <div key={idx}>
                      <p className="text-lg mt-6 mb-2">{q.question}</p>
                      <div className="pb-2">
                        <textarea
                          name={`question_${idx}`}
                          id={`question_${idx}`}
                          placeholder={q.placeholder}
                          rows={2}
                          className="block text-black w-full p-1 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex mt-6 justify-start">
                    <div className="text-white px-1 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={5}
                        stroke="currentColor"
                        className={`size-10 ${state !== State.GeneratingReview ? "animate-bounce-horizontal" : ""}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                    <button
                      onClick={handleGenerateReview}
                      className="bg-white mb-8 text-black px-4 py-2 rounded-lg"
                      disabled={state === State.GeneratingReview}
                    >
                      {state === State.GeneratingReview
                        ? "Generating..."
                        : "Generate Review"}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          {state === State.ReviewGenerated && (
            <>
              <h1 className="text-2xl font-bold text-left tracking-wide">
                Generated review:
              </h1>
              <p className="text-lg mt-4 mb-8">
                Here&#39;s the generated review for your employee. If you want
                to make changes, use the &#39;Request Changes&#39; button below
                the review.
              </p>
              <div className="h-0.5 bg-white"></div>

              <div className="min-h-40 text-black mt-10 rounded-lg bg-white relative">
                <div className="p-4">
                  <p>{generatedReview}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleRequestChanges}
                  className="bg-purple-600 mb-8 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Request Changes
                </button>
              </div>
            </>
          )}
          <div className="h-0.5 bg-white"></div>
          <div className="flex items-center justify-center font-mono mt-8 space-x-2">
            <Image src="/ollama.svg" alt="ollama" width={50} height={50} />
            <p className="">Powered by OLLAMA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
