import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Chat() {
  return (
    <div>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2>🤖 AI Chat</h2>
          <p>Ask questions to the AI assistant.</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;