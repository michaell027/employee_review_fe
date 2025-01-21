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
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-stretch text-white">
      <div className="lg:flex w-full lg:w-1/2 clip-background items-center">
        <div aria-hidden="true" className="clip-background-color-first-holder">
          <div className="clip-background-color-first" />
        </div>
        <div aria-hidden="true" className="clip-background-color-second-holder">
          <div className="clip-background-color-second" />
        </div>
        <div className="w-full px-24 z-10">
          <h1 className="text-4xl font-bold text-left tracking-wide">
            Keep your team on track...
          </h1>
          <p className="text-xl my-6">
            Please response the questions about your employee to generate review
            and then click the button below.
          </p>
          <div className="h-0.5 bg-white"></div>
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
            <div
              suppressHydrationWarning={true}
              className="text-white px-1 rounded-lg mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={5}
                stroke="currentColor"
                className="size-10 animate-bounce-horizontal"
              >
                <path
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-lg">
              Generate review
            </button>
          </div>
        </div>
      </div>
      <div
        className="w-full lg:w-1/2 flex items-center justify-center text-center md:px-16"
        style={{ backgroundColor: "#2c3443" }}
      >
        <div className="w-full py-6 z-20">
          <h1 className="my-6">nieco</h1>
          <div className="py-6 space-x-2">nieco</div>
          <p className="text-gray-100">or use email your account</p>
          <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
            <div className="pb-2 pt-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="block w-full p-4 text-lg rounded-sm bg-black"
              />
            </div>
            <div className="pb-2 pt-4">
              <input
                className="block w-full p-4 text-lg rounded-sm bg-black"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="px-4 pb-2 pt-4">
              <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                sign in
              </button>
            </div>

            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
              aaa
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
