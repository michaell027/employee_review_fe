"use client";

import { Fragment } from "react";
import { Transition } from "@headlessui/react";

export default function Loading() {
  return (
    <div className="clip-background">
      <div aria-hidden="true" className="clip-background-color-first-holder">
        <div className="clip-background-color-first" />
      </div>
      <div aria-hidden="true" className="clip-background-color-second-holder">
        <div className="clip-background-color-second" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Loading Your Experience
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12">
            Preparing your employee review tools...
          </p>
        </div>

        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-transparent border-t-[#ff4694] border-r-[#776fff] rounded-full animate-spin"></div>

          <div className="absolute inset-4 bg-white/10 rounded-full animate-pulse"></div>

          <div className="absolute inset-10 bg-white rounded-full"></div>
        </div>

        <div className="flex space-x-2 mt-8">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full bg-white/30"
              style={{
                animation: "pulse 1.5s infinite",
                animationDelay: `${index * 0.3}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="mt-12 text-white/80 text-sm tracking-widest uppercase">
          <Transition
            as={Fragment}
            show={true}
            appear={true}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-30"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-30"
          >
            <span
              className="inline-block"
              style={{ animation: "fadeIn 2s infinite" }}
            >
              Initializing
            </span>
          </Transition>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translate(
              ${Math.random() > 0.5 ? "+" : "-"}100px,
              ${Math.random() > 0.5 ? "+" : "-"}100px
            );
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
