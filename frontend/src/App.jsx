
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Chat from "./pages/Chat";
// import Profile from "./pages/Profile";
// import Attendance from "./pages/Attendance";
// import Notes from "./pages/Notes";
// import Notice from "./pages/Notice";
// import Timetable from "./pages/Timetable";
// import ChatHistory from "./pages/ChatHistory";
// function App() {
//   return (
//     <BrowserRouter>

//       <Routes>

//         <Route path="/" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/chat" element={<Chat />} />

//         <Route path="/profile" element={<Profile />} />

//         <Route path="/attendance" element={<Attendance />} />

//         <Route path="/notes" element={<Notes />} />

//         <Route path="/notice" element={<Notice />} />

//         <Route path="/timetable" element={<Timetable />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/chat-history" element={<ChatHistory />} />
//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Notice from "./pages/Notice";
import Timetable from "./pages/Timetable";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* 🔒 Protected Routes (Requires Login) */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Default Fallback Redirect */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;