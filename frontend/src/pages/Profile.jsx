import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Profile.css";

function Profile() {

    const [student, setStudent] = useState({
        fullName: "",
        email: "",
        course: "",
        semester: ""
    });

    const [editing, setEditing] = useState(false);

    useEffect(() => {

        const email = localStorage.getItem("studentEmail");

        axios.get(`http://localhost:8080/api/students/profile/${email}`)
            .then((response) => {

                setStudent(response.data);

            });

    }, []);

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = async () => {

        try {

            await axios.put(
                "http://localhost:8080/api/students/profile",
                student
            );

            alert("Profile Updated Successfully");

            setEditing(false);

        } catch {

            alert("Unable to Update Profile");

        }

    };

    return (

        <>

            <Navbar />

            <div style={{display:"flex"}}>

                <Sidebar />

                <div className="profile-container">

                    <div className="profile-card">

                        <h2>👤 Student Profile</h2>

                        <hr />

                        <label>Full Name</label>

                        <input
                            name="fullName"
                            value={student.fullName}
                            disabled={!editing}
                            onChange={handleChange}
                        />

                        <label>Email</label>

                        <input
                            value={student.email}
                            disabled
                        />

                        <label>Course</label>

                        <input
                            name="course"
                            value={student.course}
                            disabled={!editing}
                            onChange={handleChange}
                        />

                        <label>Semester</label>

                        <input
                            name="semester"
                            value={student.semester}
                            disabled={!editing}
                            onChange={handleChange}
                        />

                        {

                            editing ?

                                <button
                                    className="save-btn"
                                    onClick={saveProfile}
                                >

                                    💾 Save

                                </button>

                                :

                                <button
                                    className="edit-btn"
                                    onClick={() => setEditing(true)}
                                >

                                    ✏ Edit Profile

                                </button>

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default Profile;