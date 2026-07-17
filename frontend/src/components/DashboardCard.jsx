function DashboardCard({ title, value, icon, color }) {

    return (

        <div className="col-md-3 mb-4">

            <div className={`card text-white bg-${color} shadow`}>

                <div className="card-body text-center">

                    <h2>{icon}</h2>

                    <h5>{title}</h5>

                    <h3>{value}</h3>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;