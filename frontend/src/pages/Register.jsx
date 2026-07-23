// import { useState } from "react";
// // import axios from "axios";
// import API from "../services/api";
// function Register() {

//     const [student, setStudent] = useState({
//         fullName: "",
//         email: "",
//         password: "",
//         course: "",
//         semester: ""
//     });

//     const handleChange = (e) => {
//         setStudent({
//             ...student,
//             [e.target.name]: e.target.value
//         });
//     };

//     const registerStudent = async (e) => {
//         e.preventDefault();

//         try {

//             const response = await API.post("/api/students/register", student);

//             alert("Registration Successful");

//             console.log(response.data);

//         } catch (error) {

//             console.log(error);

//             alert("Registration Failed");

//         }

//     };

//     return (

//         <div>

//             <h2>Student Registration</h2>

//             <form onSubmit={registerStudent}>

//                 <input
//                     type="text"
//                     name="fullName"
//                     placeholder="Full Name"
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <input
//                     type="text"
//                     name="course"
//                     placeholder="Course"
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <input
//                     type="number"
//                     name="semester"
//                     placeholder="Semester"
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <button type="submit">

//                     Register

//                 </button>

//             </form>

//         </div>

//     );

// }

// export default Register;
import { useState } from "react";
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

        // Basic client-side validation
        if (!student.fullName || !student.email || !student.password || !student.course || !student.semester) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // Updated endpoint to /api/auth/register with formatted semester integer
            const response = await API.post("/api/auth/register", {
                ...student,
                semester: Number(student.semester)
            });

            alert("Registration Successful!");
            console.log("Registration Response:", response.data);

            // Reset Form Fields
            setStudent({
                fullName: "",
                email: "",
                password: "",
                course: "",
                semester: ""
            });

        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            const errorMessage = error.response?.data?.message || "Registration Failed";
            alert(errorMessage);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Student Registration</h2>

            <form onSubmit={registerStudent}>
                <div>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={student.fullName}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", marginBottom: "12px", boxSizing: "border-box" }}
                        required
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={student.email}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", marginBottom: "12px", boxSizing: "border-box" }}
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={student.password}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", marginBottom: "12px", boxSizing: "border-box" }}
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="course"
                        placeholder="Course (e.g., B.Tech IT)"
                        value={student.course}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", marginBottom: "12px", boxSizing: "border-box" }}
                        required
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="semester"
                        placeholder="Semester"
                        value={student.semester}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", marginBottom: "18px", boxSizing: "border-box" }}
                        required
                    />
                </div>

                <button 
                    type="submit"
                    style={{ 
                        width: "100%", 
                        padding: "12px", 
                        backgroundColor: "#2563eb", 
                        color: "#ffffff", 
                        border: "none", 
                        borderRadius: "6px", 
                        fontSize: "16px",
                        cursor: "pointer" 
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;