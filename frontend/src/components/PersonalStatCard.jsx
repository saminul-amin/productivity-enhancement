const PersonalStatCard = ({ total, avg, category }) => {
  if (total === 0 && avg === 0) return null; // optional: hide if nothing to show

  return (
    <div className="bg-gray-800 text-gray-300 p-3 rounded-xl mb-6 max-w-2xl mx-auto text-sm md:text-base">
      <h3 className="text-pink-400 font-semibold mb-1">
        Personal Stats ({category})
      </h3>
      <p>
        Total Score: <span className="text-emerald-400 font-bold">{total}</span>{" "}
        | Average: <span className="text-yellow-300 font-bold">{avg}</span>
      </p>
    </div>
  );
};

export default PersonalStatCard;
