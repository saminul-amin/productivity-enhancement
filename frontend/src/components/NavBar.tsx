"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinkClass = (href: string): string =>
    pathname === href
      ? "text-emerald-400 font-bold"
      : "text-gray-300 hover:text-white";

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900 text-white shadow-md border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-pink-400">Productivity Hub</h1>
        </Link>
        <div className="flex gap-4 text-sm md:text-base">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link href="/statistics" className={navLinkClass("/statistics")}>
            Statistics
          </Link>
          <Link href="/leaderboard" className={navLinkClass("/leaderboard")}>
            Leaderboard
          </Link>
          <Link href="/compare" className={navLinkClass("/compare")}>
            Compare
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
