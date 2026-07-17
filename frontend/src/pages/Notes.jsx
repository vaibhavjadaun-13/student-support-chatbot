import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Notes() {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid p-4">
          <h2>📚 Notes</h2>
        </div>
      </div>
    </div>
  );
}

export default Notes;