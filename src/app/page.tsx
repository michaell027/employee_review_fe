import { Divider } from "./components/divider";

const links = [
  { name: "Add company", href: "#" },
  { name: "Fill information", href: "#" },
  { name: "Add employees", href: "#" },
  { name: "Generate review", href: "#" },
];

export default function Example() {
  return (
    <div
      className="relative isolate overflow-y-auto overflow-x-hidden bg-gray-900 py-16 sm:py-24 w-full"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl w-full h-full"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-full h-full bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu w-full h-full"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-full h-full bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Streamline Your Team Management
          </h2>
          <p className="mt-8 text-pretty font-medium text-gray-300 sm:text-xl/8">
            Save time and simplify the employee review process. Our application
            allows you to quickly create personalized reviews for your employees
            based on their roles. Simply answer a few straightforward questions,
            and let our technology handle the rest.
          </p>
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Divider />
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-center">
                {link.name}
                <span className="pl-2" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
