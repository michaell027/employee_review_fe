"use client";
import { useEffect, useState } from "react";
import OllamaFooter from "@/components/ollama-footer";
import Loading from "@/components/loading";
import LineDivider from "@/components/line-divider";
import Chat from "@/components/chat";

enum State {
  LoadingQuestions = 0,
  QuestionsLoaded = 1,
  GeneratingReview = 2,
  ReviewGenerated = 3,
  Chatting = 4,
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
    setState(State.Chatting);
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
              <p className="mt-8 text-xl my-6">
                Please respond to the questions about your employee to generate
                a review, then click the button below.
              </p>
              <LineDivider />
              {state === State.LoadingQuestions && <Loading />}
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
                          className="block text-black w-full p-2 rounded-md"
                        />
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
                      onClick={handleGenerateReview}
                      className="bg-white mb-8 text-black px-4 py-2 rounded-md"
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
          {(state === State.ReviewGenerated || state === State.Chatting) && (
            <>
              <h1 className="text-2xl font-bold text-left tracking-wide">
                Generated review:
              </h1>
              <p className="text-lg my-8">
                Here&#39;s the generated review for your employee. If you want
                to make changes, use the &#39;Request Changes&#39; button below
                the review and start a chat with the AI model.
              </p>
              <LineDivider />
              {state === State.Chatting ? (
                <Chat review={generatedReview} />
              ) : (
                <>
                  <div className="min-h-40 text-black mt-10 rounded-md bg-white relative">
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
          )}
          <LineDivider />
          <OllamaFooter />
        </div>
      </div>
    </section>
  );
}
