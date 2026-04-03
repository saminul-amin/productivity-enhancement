import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-gray-300 mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-white text-gray-900 font-semibold px-5 py-2 rounded-full shadow-md hover:bg-gray-300 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
