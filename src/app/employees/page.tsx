import Image from "next/image";

export default function Employees() {
  return (
    <section className="min-h-fit flex flex-col items-stretch text-white bg-white">
      <div className="lg:flex w-full lg:px-64 clip-background items-center">
        <div aria-hidden="true" className="clip-background-color-first-holder">
          <div className="clip-background-color-first" />
        </div>
        <div aria-hidden="true" className="clip-background-color-second-holder">
          <div className="clip-background-color-second" />
        </div>
        <div className="w-full flex flex-col items-center justify-center z-10">
          <div className="px-4 py-8 w-full bg-[#121828] rounded-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">Team Members</h3>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="rounded-full"
                      src="/profile-picture.jpg"
                      alt="Neil image"
                      width={32}
                      height={32}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-lg truncate text-white m-0">
                        Neil Sims
                      </p>
                      <p className="text-sm truncate text-white m-0">
                        Frontend Developer
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button className="flex border-2 border-green-800 bg-green-800 px-2 py-1 rounded-md text-sm">
                        Send review
                      </button>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="rounded-full"
                      src="/profile-picture.jpg"
                      alt="Neil image"
                      width={32}
                      height={32}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-lg truncate text-white m-0">
                        Neil Sims
                      </p>
                      <p className="text-sm truncate text-white m-0">
                        Frontend Developer
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button className="flex border-2 border-white px-2 py-1 rounded-md text-sm">
                        Review sent
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
