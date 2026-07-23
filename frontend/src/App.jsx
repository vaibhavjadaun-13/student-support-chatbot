import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Attendance from "./pages/Attendance";
import Notes from "./pages/Notes";
import Notice from "./pages/Notice";
import Timetable from "./pages/Timetable";
import Profile from "./pages/Profile";
import ChatHistory from "./pages/ChatHistory";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/chat-history" element={<ChatHistory />} />
                </Route>

                {/* Default Route */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </Router>
    );
}

export default App;