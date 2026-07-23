import { useState } from "react";
// import axios from "axios";
import API from "../services/api";
function Register() {

    const [student, setStudent] = useState({
        fullName: "",
        email: "",
        password: "",
        course: "",
        semester: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const registerStudent = async (e) => {
        e.preventDefault();

        try {

            const response = await API.post("/api/students/register", student);

            alert("Registration Successful");

            console.log(response.data);

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <div>

            <h2>Student Registration</h2>

            <form onSubmit={registerStudent}>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="semester"
                    placeholder="Semester"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    Register

                </button>

            </form>

        </div>

    );

}

export default Register;