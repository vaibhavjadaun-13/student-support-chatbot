import "./Attendance.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);

const [editingId, setEditingId] = useState(null);

const [search, setSearch] = useState("");

const [form, setForm] = useState({
    subject: "",
    totalClasses: "",
    attendedClasses: ""
});
const totalSubjects = attendanceList.length;

const averageAttendance =
    totalSubjects > 0
        ? (
              attendanceList.reduce(
                  (sum, item) => sum + item.attendancePercentage,
                  0
              ) / totalSubjects
          ).toFixed(1)
        : 0;

const shortageCount = attendanceList.filter(
    item => item.attendancePercentage < 75
).length;
useEffect(() => {
    loadAttendance();
}, []);
const loadAttendance = async () => {

    try {

        const response = await axios.get(
            "http://localhost:8080/api/attendance"
        );

        setAttendanceList(response.data);

    }

    catch {

        alert("Unable to load attendance.");

    }

};
const addAttendance = async () => {

    if (
        !form.subject ||
        !form.totalClasses ||
        !form.attendedClasses
    ) {

        alert("Fill all fields");

        return;

    }

    try {
      if (Number(form.attendedClasses) > Number(form.totalClasses)) {

    alert("Attended classes cannot be greater than Total Classes.");

    return;

}
        await axios.post(
            "http://localhost:8080/api/attendance",
            form
        );

        alert("Attendance Added");

        setForm({
            subject: "",
            totalClasses: "",
            attendedClasses: ""
        });

        setEditingId(null);

        loadAttendance();

    }

    catch {

        alert("Unable to Add Attendance");

    }

};
const deleteAttendance = async (id) => {

    if (!window.confirm("Delete Attendance?"))
        return;

    try {

        await axios.delete(
            "http://localhost:8080/api/attendance/" + id
        );

        loadAttendance();

    }

    catch {

        alert("Delete Failed");

    }

};
const editAttendance = (attendance) => {

    setEditingId(attendance.id);

    setForm({

        subject: attendance.subject,

        totalClasses: attendance.totalClasses,

        attendedClasses: attendance.attendedClasses

    });

};
const updateAttendance = async () => {

    try {

        await axios.put(

            "http://localhost:8080/api/attendance/" + editingId,

            form

        );

        alert("Attendance Updated");

        setEditingId(null);

        setForm({

            subject: "",

            totalClasses: "",

            attendedClasses: ""

        });

        loadAttendance();

    }

    catch {

        alert("Update Failed");

    }

};
return (

    <>

        <Navbar />

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div className="attendance-container">

                <h2 className="attendance-title">

                    📊 Attendance Management

                </h2>
<div className="dashboard-cards">

    <div className="dashboard-card">

        <h3>📚 Subjects</h3>

        <h1>{totalSubjects}</h1>

    </div>

    <div className="dashboard-card">

        <h3>📈 Average</h3>

        <h1>{averageAttendance}%</h1>

    </div>

    <div className="dashboard-card">

        <h3>⚠ Shortage</h3>

        <h1>{shortageCount}</h1>

    </div>

</div>
                <div className="attendance-form">

                    <input
                        type="text"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                subject:e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Total Classes"
                        value={form.totalClasses}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                totalClasses:e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Attended Classes"
                        value={form.attendedClasses}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                attendedClasses:e.target.value
                            })
                        }
                    />

                    {

                        editingId ?

                        <button onClick={updateAttendance}>

                            Update Attendance

                        </button>

                        :

                        <button onClick={addAttendance}>

                            Add Attendance

                        </button>

                    }

                </div>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search Subject..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                </div>
                <div className="attendance-grid">

{

[...attendanceList]

.sort((a,b)=>a.subject.localeCompare(b.subject))

.filter(item=>{

    if(search==="") return true;

    return item.subject.toLowerCase().includes(search.toLowerCase());

})

.map((item)=>(

<div
key={item.id}
className="attendance-card"
>

<h3>

📚 {item.subject}

</h3>

<p>

<b>Total Classes :</b> {item.totalClasses}

</p>

<p>

<b>Attended :</b> {item.attendedClasses}

</p>

<p>

<b>Attendance :</b>

{(item.attendancePercentage ?? 0).toFixed(2)}%
</p>

<div className="progress">

<div

className="progress-bar"

style={{

width:item.attendancePercentage+"%",

background:

item.attendancePercentage>=75

?

"#22c55e"

:

"#ef4444"

}}

>

</div>

</div>

<p>

{

item.status==="Present"

?

<span className="status-present">

🟢 Present

</span>

:

<span className="status-short">

🔴 Short Attendance

</span>

}

</p>

<div className="attendance-actions">

<button

className="edit-btn"

onClick={()=>editAttendance(item)}

>

Edit

</button>

<button

className="delete-btn"

onClick={()=>deleteAttendance(item.id)}

>

Delete

</button>

</div>

</div>

))

}

{

[...attendanceList]

.filter(item=>{

    if(search==="") return true;

    return item.subject.toLowerCase().includes(search.toLowerCase());

})

.length===0 &&

<div className="no-data">

📊 No Attendance Records Found

</div>

}

</div>
            </div>

        </div>

    </>

);
}
export default Attendance;