import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("studentEmail");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container-fluid">

                <span className="navbar-brand fw-bold">

                    🎓 AI Student Support

                </span>

                <button
                    className="btn btn-light"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;