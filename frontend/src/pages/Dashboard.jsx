import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {

    return (

        <div>

            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">

                        Welcome, Student 👋

                    </h2>

                    <div className="row">

                        <DashboardCard
                            title="Course"
                            value="B.Tech IT"
                            icon="📚"
                            color="primary"
                        />

                        <DashboardCard
                            title="Semester"
                            value="5"
                            icon="🎓"
                            color="success"
                        />

                        <DashboardCard
                            title="Attendance"
                            value="85%"
                            icon="📊"
                            color="warning"
                        />

                        <DashboardCard
                            title="AI Chat"
                            value="Online"
                            icon="🤖"
                            color="danger"
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;