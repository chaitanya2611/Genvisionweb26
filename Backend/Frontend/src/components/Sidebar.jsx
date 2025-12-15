export default function Sidebar({ setActiveTab }) {
    return (
      <div className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-3">
        <h2 className="text-2xl font-bold mb-4">⚙️ Admin Panel</h2>
        <button
          onClick={() => setActiveTab("about")}
          className="text-left hover:bg-gray-700 p-2 rounded"
        >
          📅 Manage About
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className="text-left hover:bg-gray-700 p-2 rounded"
        >
          📅 Manage Events
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className="text-left hover:bg-gray-700 p-2 rounded"
        >
          👥 Manage Participants
        </button>
        <button
          onClick={() => setActiveTab("guests")}
          className="text-left hover:bg-gray-700 p-2 rounded"
        >
          🎤 Manage Guests
        </button>
        <button
          onClick={() => setActiveTab("coordinators")}
          className="text-left hover:bg-gray-700 p-2 rounded"
        >
          🧑‍💼 Manage Coordinators
        </button>
      </div>
    );
  }
  