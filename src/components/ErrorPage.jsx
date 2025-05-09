import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
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
      className="w-full h-screen bg-gray-950 overflow-hidden relative"
      ref={containerRef}
    >
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
        <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-white text-gray-900 font-semibold px-5 py-2 rounded-full shadow-md hover:bg-gray-300  transition"
        >
          Go Back Home
        </Link>
      </div>
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
};

export default ErrorPage;
