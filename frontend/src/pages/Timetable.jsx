// import "./Timetable.css";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// function Timetable() {

//     const [timetable, setTimetable] = useState([]);

//     const [searchDay, setSearchDay] = useState("");

//     const [editingId, setEditingId] = useState(null);

//     const [form, setForm] = useState({
//         day: "",
//         subject: "",
//         faculty: "",
//         room: "",
//         startTime: "",
//         endTime: ""
//     });

//     useEffect(() => {
//         loadTimetable();
//     }, []);
//     const loadTimetable = async () => {

//     try {

//         const response = await API.get("/api/timetable");

//         setTimetable(response.data);

//     } catch (error) {

//         console.error(error.response?.data || error.message);

//         alert("Unable to load timetable.");

//     }

// };
// const addTimetable = async () => {

//     if (
//         !form.day ||
//         !form.subject ||
//         !form.faculty ||
//         !form.room ||
//         !form.startTime ||
//         !form.endTime
//     ) {

//         alert("Fill all fields");
//         return;

//     }

//     try {

//         await API.post("/api/timetable", form);

//         alert("Timetable Added");

//         setForm({
//             day: "",
//             subject: "",
//             faculty: "",
//             room: "",
//             startTime: "",
//             endTime: ""
//         });

//         loadTimetable();

//     } catch (error) {

//         console.error(error.response?.data || error.message);

//         alert("Unable to Add");

//     }

// };
// const updateTimetable = async () => {

//     try {

//         await API.put(
//             "/api/timetable/" + editingId,
//             form
//         );

//         alert("Updated Successfully");

//         setEditingId(null);

//         setForm({
//             day: "",
//             subject: "",
//             faculty: "",
//             room: "",
//             startTime: "",
//             endTime: ""
//         });

//         loadTimetable();

//     } catch (error) {

//         console.error(error.response?.data || error.message);

//         alert("Update Failed");

//     }

// };
// const deleteTimetable = async (id) => {

//     if (!window.confirm("Delete this lecture?"))
//         return;

//     try {

//         await API.delete("/api/timetable/" + id);

//         loadTimetable();

//     } catch (error) {

//         console.error(error.response?.data || error.message);

//         alert("Delete Failed");

//     }

// };
// return (

//     <>

//         <Navbar />

//         <div style={{ display: "flex" }}>

//             <Sidebar />

//             <div className="timetable-container">

//                 <h2 className="title">
//                     📅 Timetable Management
//                 </h2>

//                 <div className="summary-container">

//                     <div className="summary-card">
//                         <h3>Total Classes</h3>
//                         <p>{timetable.length}</p>
//                     </div>

//                     <div className="summary-card">
//                         <h3>Today's Filter</h3>
//                         <p>{searchDay === "" ? "All Days" : searchDay}</p>
//                     </div>

//                     <div className="summary-card">
//                         <h3>Faculty</h3>
//                         <p>{new Set(timetable.map(item => item.faculty)).size}</p>
//                     </div>

//                 </div>

//                 <div className="form-card">

//                     <select
//                         value={form.day}
//                         onChange={(e) =>
//                             setForm({ ...form, day: e.target.value })
//                         }
//                     >
//                         <option value="">Select Day</option>
//                         <option>Monday</option>
//                         <option>Tuesday</option>
//                         <option>Wednesday</option>
//                         <option>Thursday</option>
//                         <option>Friday</option>
//                         <option>Saturday</option>
//                     </select>

//                     <input
//                         placeholder="Subject"
//                         value={form.subject}
//                         onChange={(e) =>
//                             setForm({ ...form, subject: e.target.value })
//                         }
//                     />

//                     <input
//                         placeholder="Faculty"
//                         value={form.faculty}
//                         onChange={(e) =>
//                             setForm({ ...form, faculty: e.target.value })
//                         }
//                     />

//                     <input
//                         placeholder="Room"
//                         value={form.room}
//                         onChange={(e) =>
//                             setForm({ ...form, room: e.target.value })
//                         }
//                     />

//                     <input
//                         type="time"
//                         value={form.startTime}
//                         onChange={(e) =>
//                             setForm({ ...form, startTime: e.target.value })
//                         }
//                     />

//                     <input
//                         type="time"
//                         value={form.endTime}
//                         onChange={(e) =>
//                             setForm({ ...form, endTime: e.target.value })
//                         }
//                     />

//                     {
//                         editingId ? (
//                             <button
//                                 className="update-btn"
//                                 onClick={updateTimetable}
//                             >
//                                 Update Timetable
//                             </button>
//                         ) : (
//                             <button onClick={addTimetable}>
//                                 Add Timetable
//                             </button>
//                         )
//                     }

//                 </div>

//                 <div className="search-box">

//                     <select
//                         value={searchDay}
//                         onChange={(e) => setSearchDay(e.target.value)}
//                     >
//                         <option value="">All Days</option>
//                         <option>Monday</option>
//                         <option>Tuesday</option>
//                         <option>Wednesday</option>
//                         <option>Thursday</option>
//                         <option>Friday</option>
//                         <option>Saturday</option>
//                     </select>

//                 </div>

//                 <table>

//                     <thead>

//                         <tr>

//                             <th>Day</th>
//                             <th>Subject</th>
//                             <th>Faculty</th>
//                             <th>Room</th>
//                             <th>Start</th>
//                             <th>End</th>
//                             <th>Action</th>

//                         </tr>

//                     </thead>

//                     <tbody>

//                         {

//                             timetable

//                                 .filter(item => {

//                                     if (searchDay === "")
//                                         return true;

//                                     return item.day.toLowerCase() === searchDay.toLowerCase();

//                                 })

//                                 .map((item) => (

//                                     <tr key={item.id}>

//                                         <td>
//                                             <span className="day-badge">
//                                                 {item.day}
//                                             </span>
//                                         </td>

//                                         <td>
//                                             <span className="subject-badge">
//                                                 {item.subject}
//                                             </span>
//                                         </td>

//                                         <td>
//                                             <div className="faculty-card">
//                                                 👨‍🏫 {item.faculty}
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <span className="room-badge">
//                                                 🏫 {item.room}
//                                             </span>
//                                         </td>

//                                         <td>{item.startTime?.substring(0, 5)}</td>

//                                         <td>{item.endTime?.substring(0, 5)}</td>

//                                         <td>

//                                             <button
//                                                 className="edit-btn"
//                                                 onClick={() => {

//                                                     setEditingId(item.id);

//                                                     setForm({

//                                                         day: item.day,
//                                                         subject: item.subject,
//                                                         faculty: item.faculty,
//                                                         room: item.room,
//                                                         startTime: item.startTime,
//                                                         endTime: item.endTime

//                                                     });

//                                                 }}
//                                             >
//                                                 Edit
//                                             </button>

//                                             <button
//                                                 className="delete-btn"
//                                                 onClick={() => deleteTimetable(item.id)}
//                                             >
//                                                 Delete
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))

//                         }

//                     </tbody>

//                 </table>

//             </div>

//         </div>

//     </>

// );

// }

// export default Timetable;
import "./Timetable.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import API from "../services/api";

function Timetable() {
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        loadTimetable();
    }, []);

    const loadTimetable = async () => {
        try {
            const response = await API.get("/api/timetable");
            setTimetable(response.data || []);
        } catch (error) {
            console.error("Failed to fetch timetable:", error);
        }
    };

    // Safe time formatter with fallback
    const formatTime = (timeStr) => {
        if (!timeStr || typeof timeStr !== "string") {
            return "--:--";
        }
        return timeStr.substring(0, 5);
    };

    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div className="timetable-container">
                    <h2>📅 Weekly Timetable</h2>

                    <table className="timetable">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Subject</th>
                                <th>Teacher</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetable.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.dayOfWeek || "N/A"}</td>
                                    <td>{item.subjectName || "N/A"}</td>
                                    <td>{item.teacherName || "N/A"}</td>
                                    <td>{formatTime(item.startTime)}</td>
                                    <td>{formatTime(item.endTime)}</td>
                                </tr>
                            ))}

                            {timetable.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                        No timetable schedule available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Timetable;