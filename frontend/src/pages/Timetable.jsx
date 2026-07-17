import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Timetable() {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid p-4">
          <h2>📅 Timetable</h2>
        </div>
      </div>
    </div>
  );
}

export default Timetable;