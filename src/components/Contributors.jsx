const contributorRoles = [
  {
    role: "Full Stack Developer",
    emoji: "🧑‍💻",
    assignedTo: "Md. Saminul Amin",
    description:
      "Built the entire platform from scratch, from UI design to backend logic. Also brews the tea of productivity.",
    image: "/roles/role-1.jpg",
    status: "active",
  },
  {
    role: "SQL Data Entry & Stats Manager",
    emoji: "🗃️",
    assignedTo: null,
    description:
      "Responsible for inserting and managing weekly productivity data into the backend system.",
    image: "/roles/role-2.png",
    status: "vacant",
  },
  {
    role: "Poll Creator",
    emoji: "📊",
    assignedTo: "Md. Saminul Amin & Wazih Abdullah",
    description:
      "Regularly creates polls to vote for the weekly productivity hero.",
    image: "/roles/role-3.jpg",
    status: "active",
  },
  {
    role: "WhatsApp Community Moderator",
    emoji: "📱",
    assignedTo: "Md. Saminul Amin",
    description:
      "Keeps the community organized and ensures weekly rules are followed fairly.",
    image: "/roles/role-4.png",
    status: "active",
  },
  {
    role: "Celebration Coordinator",
    emoji: "🎉",
    assignedTo: "Md. Saminul Amin",
    description:
      "Leads celebrations, updates group photos, and hypes up winners.",
    image: "/roles/role-5.jpg",
    status: "rotating",
  },
];

const Contributors = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-400">
        Contributors & Roles
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {contributorRoles.map((role, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-xl p-4 text-center flex flex-col items-center hover:bg-gray-700 transition"
          >
            <img
              src={role.image}
              alt={role.role}
              className="w-24 h-24 object-cover rounded-full border-2 border-pink-400 mb-3"
            />
            <h3 className="text-lg font-bold text-emerald-300">
              {role.emoji} {role.role}
            </h3>
            <div className="text-sm italic text-gray-400 mb-1 flex gap-3 items-center justify-center">
              <p>
                {role.assignedTo ? (
                  <p className="px-12">
                    Assigned to:{" "}
                    <span className="font-bold">{role.assignedTo}</span>
                  </p>
                ) : (
                  "Not assigned yet"
                )}
              </p>
              <p>
                {role.status === "vacant" && (
                  <p className="mt-auto bg-pink-500 hover:bg-pink-600 text-white px-2 py-0 rounded-full text-sm">
                    Vacancy Here
                  </p>
                )}
              </p>
            </div>
            <p className="text-sm text-gray-300 mb-1">{role.description}</p>
            {role.status === "vacant" && (
              <div>
                <p className="italic text-gray-400">*DM for apply</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
