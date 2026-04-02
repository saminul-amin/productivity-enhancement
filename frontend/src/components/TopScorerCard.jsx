const TopScorerCard = ({ scorer }) => {
  if (!scorer) return null;

  return (
    <div className="bg-gray-800 text-gray-100 p-4 rounded-xl mb-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-2 text-pink-400">Top Scorer</h3>
      <p>
        <span className="font-bold text-emerald-400">{scorer.name}</span> with an average score of{" "}
        <span className="font-semibold">{scorer.avg}</span> over{" "}
        <span className="font-semibold">{scorer.count}</span> days.
      </p>
      <p className="mt-1">
        Total Score: <span className="text-yellow-400 font-medium">{scorer.total}</span>
      </p>
      <p className="mt-3 text-green-400 italic">Keep up the momentum, <span className="font-bold">{scorer.name.split()[0]}</span>! 🌟</p>
    </div>
  );
};

export default TopScorerCard;
