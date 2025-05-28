const Tabulation = ({ data, title = "Tabulation Sheet" }) => {
  return (
    <div className="bg-gray-900 text-white py-10 px-4 mt-0">
      <h1 className="text-3xl font-bold text-center text-pink-400 mb-6">
        📋 {title}
      </h1>

      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="table-auto w-full border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-3 border-b border-gray-700">#</th>
              <th className="p-3 border-b border-gray-700">Name</th>
              <th className="p-3 border-b border-gray-700">Total</th>
              <th className="p-3 border-b border-gray-700">Average</th>
              <th className="p-3 border-b border-gray-700">Highest</th>
              <th className="p-3 border-b border-gray-700">Lowest</th>
              <th className="p-3 border-b border-gray-700">Days Count</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((entry, idx) => (
                <tr key={idx} className="even:bg-gray-800">
                  <td className="p-3 border-b border-gray-700">{idx + 1}</td>
                  <td className="p-3 border-b border-gray-700">{entry.name}</td>
                  <td className="p-3 border-b border-gray-700">
                    {entry.total}
                  </td>
                  <td className="p-3 border-b border-gray-700">{entry.avg}</td>
                  <td className="p-3 border-b border-gray-700">
                    {entry.highest?.score} ({entry.highest?.date}{" "}
                    {entry.highest?.month})
                  </td>
                  <td className="p-3 border-b border-gray-700">
                    {entry.lowest?.score} ({entry.lowest?.date}{" "}
                    {entry.lowest?.month})
                  </td>
                  <td className="p-3 border-b border-gray-700">
                    {entry.count}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-red-400">
                  ⚠️ No data available for {month}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabulation;
