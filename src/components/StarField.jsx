import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

export default function StarField() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const stars = Array.from({ length: 100 }, () => {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      star.style.opacity = Math.random();
      container.appendChild(star);
      return star;
    });

    return () => {
      stars.forEach((star) => container.removeChild(star));
    };
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-gray-950 overflow-hidden relative"
      ref={containerRef}
    >
      {/* <h1 className="absolute text-white text-4xl font-bold top-10 left-10 z-10">
        Moving Stars ✨
      </h1> */}
      <Outlet />
      <style>{`
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation-name: moveStar;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes moveStar {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
