import React from "react";

const notices = [
  "[IMPORTANT] The selected persons for the reward will be announced after 1 working day of the month of May!",
  "[IMPORTANT] There will be rewards for the winners of each group for the month of May! You can suggest prizes in WhatsApp!",
];

const Noticeboard = () => {
  return (
    <div className="bg-gray-800 text-gray-100 rounded-xl p-4 shadow-md mt-26 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl text-center font-bold text-pink-400 mb-2">
        Noticeboard
      </h2>
      <ul className="space-y-2 text-lg mb-9">
        {notices.map((notice, idx) => (
          <li
            key={idx}
            className="bg-gray-700 text-gray-300 px-6 py-4 rounded-lg hover:bg-gray-600 transition"
          >
            {notice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Noticeboard;
