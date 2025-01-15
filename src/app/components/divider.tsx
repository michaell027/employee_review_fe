"use client";
import { useEffect, useRef, useState } from "react";

export function Divider() {
  const initialBallPositions = [0, 1, 2];
  const [ballPositions, setBallPositions] = useState(initialBallPositions);
  const [activeBall, setActiveBall] = useState<number | null>(null);
  const [remValue, setRemValue] = useState(1);
  const ballRefs = [
    useRef<HTMLSpanElement | null>(null),
    useRef<HTMLSpanElement | null>(null),
    useRef<HTMLSpanElement | null>(null),
  ];

  const updateRemValue = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 480) {
      setRemValue(0.5);
    } else if (windowWidth <= 768) {
      setRemValue(1);
    } else {
      setRemValue(1.5);
    }
  };

  useEffect(() => {
    updateRemValue();
    window.addEventListener("resize", updateRemValue);
    return () => {
      window.removeEventListener("resize", updateRemValue);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBall((prev) => {
        if (prev === 1) return 0;
        if (prev === 0) return null;
        if (prev === 2) return 1;
        return 2;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeBall == null) {
      setBallPositions([0, 1, 2]);
      ballRefs.forEach((ref, idx) => {
        if (ref.current) {
          ref.current.style.transform = `translateX(${idx * remValue}rem)`;
        }
      });
    } else if (activeBall === 0 && ballRefs[0].current) {
      ballRefs[0].current.style.transform = `translateX(${
        ballPositions[0] + 18 * remValue
      }rem)`;
      setBallPositions((prev) => [
        prev[0] + 18 * remValue,
        prev[1] + 19 * remValue,
        prev[2] + 20 * remValue,
      ]);
    } else if (activeBall === 1 && ballRefs[1].current) {
      ballRefs[1].current.style.transform = `translateX(${
        ballPositions[1] + 19 * remValue
      }rem)`;
      setBallPositions((prev) => [
        prev[0],
        prev[1] + 19 * remValue,
        prev[2] + 20 * remValue,
      ]);
    } else if (activeBall === 2 && ballRefs[2].current) {
      ballRefs[2].current.style.transform = `translateX(${
        ballPositions[2] + 20 * remValue
      }rem)`;
      setBallPositions((prev) => [prev[0], prev[1], prev[2] + 20 * remValue]);
    }
  }, [activeBall, remValue]);

  return (
    <div suppressHydrationWarning={true} className="flex space-x-4 mt-8">
      {ballPositions.map((_, idx) => {
        return (
          <span
            key={idx}
            ref={ballRefs[idx]}
            className="w-3 h-3 bg-white rounded-full transition-transform duration-300 absolute top-0 left-0"
            style={{
              transform: `translateX(${idx * remValue}rem)`,
              position: "relative",
            }}
          ></span>
        );
      })}
    </div>
  );
}
