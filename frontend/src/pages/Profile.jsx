import { useEffect, useState } from "react";
import API from "../services/api";
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

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const email = localStorage.getItem("studentEmail");

            const response = await API.get(
                `/api/students/profile/${email}`
            );

            setStudent(response.data);

        } catch (error) {

            console.error(error.response?.data || error.message);

            alert("Unable to Load Profile");

        }

    };

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = async () => {

        try {

            await API.put(
                "/api/students/profile",
                student
            );

            alert("Profile Updated Successfully");

            setEditing(false);

            loadProfile();

        } catch (error) {

            console.error(error.response?.data || error.message);

            alert("Unable to Update Profile");

        }

    };

    return (

        <>

            <Navbar />

            <div style={{ display: "flex" }}>

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