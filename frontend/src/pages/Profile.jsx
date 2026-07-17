import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid p-4">
          <h2>👤 Profile</h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;