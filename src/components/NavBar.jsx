import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900 text-white shadow-md border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold text-pink-400">Productivity Hub</h1>
        </Link>
        <div className="flex gap-4 text-sm md:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-400 font-bold"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-400 font-bold"
                : "text-gray-300 hover:text-white"
            }
          >
            Statistics
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-400 font-bold"
                : "text-gray-300 hover:text-white"
            }
          >
            Leaderboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
