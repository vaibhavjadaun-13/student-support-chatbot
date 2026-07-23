import { useState } from "react";
// import axios from "axios";
import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            console.log("Login button clicked");
const response = await API.post(
    "/api/auth/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            if (response.data.success) {

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("studentEmail", email);

                alert("Login Successful");

                window.location.href = "/dashboard";

            } else {

                alert(response.data.message);

            }

        } catch (error) {

            // console.log(error);
            console.error(error.response?.data || error.message);

            alert("Login Failed");

        }

    };

    return (

        <div>

            <h2>Student Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>
                Login
            </button>

        </div>

    );

}
export default Login;