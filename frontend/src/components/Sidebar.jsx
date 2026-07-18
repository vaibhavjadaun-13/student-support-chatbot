import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h3 className="text-center mb-4">🎓 AI Student</h3>

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            🏠 Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/chat">
            🤖 AI Chat
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/notes">
            📚 Notes
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/attendance">
            📊 Attendance
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/notice">
            📢 Notice
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/timetable">
            📅 Timetable
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/profile">
            👤 Profile
          </Link>
        </li>
<li className="nav-item">
    <Link className="nav-link text-white" to="/chat-history">
        💬 Chat History
    </Link>
</li>
        <li className="nav-item mt-4">
          <Link className="nav-link text-danger" to="/">
            🚪 Logout
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;