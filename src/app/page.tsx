import { Divider } from "./components/divider";

const links = [
  { name: "Add company", href: "#" },
  { name: "Fill information", href: "#" },
  { name: "Add employees", href: "#" },
  { name: "Generate review", href: "generate" },
];

export default function Example() {
  return (
    <div className="clip-background">
      <div aria-hidden="true" className="clip-background-color-first-holder">
        <div className="clip-background-color-first" />
      </div>
      <div aria-hidden="true" className="clip-background-color-second-holder">
        <div className="clip-background-color-second" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-white">Streamline Your Team Management</h2>
          <p className="text-gray-300">
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
