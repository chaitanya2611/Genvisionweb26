import { useState } from "react";
import Sidebar from "./Sidebar";
import AddEventForm from "./forms/AddEventForm";
import EditAbout from "./forms/EditAbout";
import AddParticipantForm from "./forms/AddParticipantForm";
// import AddStudentForm from "./forms/AddStudentForm";
import AddGuestForm from "./forms/AddGuestForm";
import AddCoordinatorForm from "./forms/AddCoordinatorForm";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("events");

  const renderTab = () => {
    switch (activeTab) {
      case "events":
        return <AddEventForm />;
        case "about":
        return <EditAbout />;
      case "participants":
        return <AddParticipantForm />;
      case "guests":
        return <AddGuestForm />;
      case "coordinators":
        return <AddCoordinatorForm />;
      default:
        return <AddEventForm />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} />
      <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded"
>
  🚪 Logout
</button>
      <div className="flex-1 p-8">{renderTab()}</div>
    </div>
    
  );
}
