// // import { useState } from "react";
// // // import axios from "axios";
// // import API from "../services/api";

// // function Login() {

// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");

// //     const login = async () => {

// //         try {

// //             console.log("Login button clicked");
// // const response = await API.post(
// //     "/api/auth/login",
// //                 {
// //                     email,
// //                     password
// //                 }
// //             );

// //             console.log(response.data);

// //             if (response.data.success) {

// //                 localStorage.setItem("isLoggedIn", "true");
// //                 localStorage.setItem("studentEmail", email);

// //                 alert("Login Successful");

// //                 window.location.href = "/dashboard";

// //             } else {

// //                 alert(response.data.message);

// //             }

// //         } catch (error) {

// //             // console.log(error);
// //             console.error(error.response?.data || error.message);

// //             alert("Login Failed");

// //         }

// //     };

// //     return (

// //         <div>

// //             <h2>Student Login</h2>

// //             <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //             />

// //             <br /><br />

// //             <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //             />

// //             <br /><br />

// //             <button onClick={login}>
// //                 Login
// //             </button>

// //         </div>

// //     );

// // }
// // export default Login;
// import { useState } from "react";
// // import axios from "axios";
// import API from "../services/api";

// function Login() {
//     const [isRegister, setIsRegister] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async () => {
//         try {
//             const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
//             console.log(`${isRegister ? "Register" : "Login"} button clicked`);

//             const response = await API.post(endpoint, {
//                 email,
//                 password
//             });

//             console.log(response.data);

//             if (response.data.success) {
//                 if (isRegister) {
//                     alert("Registration Successful! Please log in.");
//                     setIsRegister(false); // Switch back to login view
//                 } else {
//                     localStorage.setItem("isLoggedIn", "true");
//                     localStorage.setItem("studentEmail", email);

//                     alert("Login Successful");

//                     window.location.href = "/dashboard";
//                 }
//             } else {
//                 alert(response.data.message || "Operation failed");
//             }

//         } catch (error) {
//             console.error(error.response?.data || error.message);
//             alert(isRegister ? "Registration Failed" : "Login Failed");
//         }
//     };

//     return (
//         <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "sans-serif" }}>
//             <h2>{isRegister ? "Student Registration" : "Student Login"}</h2>

//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
//             />

//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
//             />

//             <button 
//                 onClick={handleSubmit}
//                 style={{ width: "100%", padding: "10px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
//             >
//                 {isRegister ? "Register" : "Login"}
//             </button>

//             <p style={{ marginTop: "20px" }}>
//                 {isRegister ? "Already have an account? " : "Don't have an account? "}
//                 <button
//                     onClick={() => setIsRegister(!isRegister)}
//                     style={{ background: "none", border: "none", color: "#2563eb", textDecoration: "underline", cursor: "pointer", padding: 0, font: "inherit" }}
//                 >
//                     {isRegister ? "Login here" : "Register here"}
//                 </button>
//             </p>
//         </div>
//     );
// }

// export default Login;
import { useState } from "react";
import API from "../services/api";

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");

    const handleSubmit = async () => {
        try {
            const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
            
            const payload = isRegister 
                ? { fullName, email, password, course, semester: Number(semester) }
                : { email, password };

            const response = await API.post(endpoint, payload);

            if (response.data.success || response.status === 200) {
                if (isRegister) {
                    alert("Registration Successful! Please log in.");
                    setIsRegister(false);
                } else {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("studentEmail", email);
                    alert("Login Successful");
                    window.location.href = "/dashboard";
                }
            } else {
                alert(response.data.message || "Operation failed");
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || (isRegister ? "Registration Failed" : "Login Failed"));
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "sans-serif" }}>
            <h2>{isRegister ? "Student Registration" : "Student Login"}</h2>

            {isRegister && (
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
            />

            {isRegister && (
                <>
                    <input
                        type="text"
                        placeholder="Course (e.g. B.Tech IT)"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
                    />
                    <input
                        type="number"
                        placeholder="Semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
                    />
                </>
            )}

            <button 
                onClick={handleSubmit}
                style={{ width: "100%", padding: "10px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                {isRegister ? "Register" : "Login"}
            </button>

            <p style={{ marginTop: "20px" }}>
                {isRegister ? "Already have an account? " : "Don't have an account? "}
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    style={{ background: "none", border: "none", color: "#2563eb", textDecoration: "underline", cursor: "pointer", padding: 0, font: "inherit" }}
                >
                    {isRegister ? "Login here" : "Register here"}
                </button>
            </p>
        </div>
    );
}

export default Login;