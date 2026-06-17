import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
   const navigate = useNavigate();
    const [dashboard, setDashboard] = useState({
        totalCandidates: 0,
        totalEmployees: 0,
        totalJobPostings: 0,
        totalApplications: 0
    });

    const fetchDashboard = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await API.get(
                "/dashboard",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        setDashboard(response.data);

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data ||
            error.message
        );
    }
};

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchDashboard();
    }, []);

    const resetDailyCounts = async () => {

    const confirmed = window.confirm(
        "Reset job postings and applications counts to 0?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await API.post(
                "/dashboard/reset-daily-counts",
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        setDashboard(response.data);

        alert("Daily counts reset successfully");

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data ||
            error.message
        );
    }
};
    const handleLogout = () => {

    localStorage.clear();

    navigate("/");
};
    return (

    <div
        style={{
            background: "#f4f7fc",
            minHeight: "100vh",
            padding: "30px"
        }}
    >
       <div className="mb-4">

    <button
        className="btn btn-primary me-2"
        onClick={() =>
            navigate("/admin")
        }
    >
        Dashboard
    </button>

    <button
        className="btn btn-success me-2"
        onClick={() =>
            navigate("/candidates")
        }
    >
        Candidates
    </button>

    <button
        className="btn btn-info me-2"
        onClick={() =>
            navigate("/employees")
        }
    >
        Employees
    </button>

    <button
        className="btn btn-danger"
        onClick={handleLogout}
    >
        Logout
    </button>

</div>

    
        {/* Welcome Banner */}

        <div
            className="card border-0 shadow-lg mb-4"
            style={{
                borderRadius: "20px",
                background:
                    "linear-gradient(135deg,#2563eb,#1e3a8a)",
                color: "white"
            }}
        >

            <div className="card-body p-5">

                <h1 className="fw-bold">
                    Welcome to Hirelix Admin Portal
                </h1>

                <p className="fs-5">

                    Manage candidates, employees,
                    applications and job workflows
                    from one place.

                </p>

            </div>

        </div>
        <div className="mb-4">

</div>

        <div className="mb-4 text-end">
            <button
                className="btn btn-outline-danger"
                onClick={resetDailyCounts}
            >
                Reset Daily Job & Application Counts
            </button>
        </div>

        {/* Statistics Cards */}

        <div className="row">

            <div className="col-md-3 mb-4">

                <div
                    className="card shadow-lg border-0"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center">

                        <h1>👥</h1>

                        <h2 className="fw-bold">
                            {dashboard.totalCandidates}
                        </h2>

                        <h5>
                            Candidates
                        </h5>

                    </div>

                </div>

            </div>

            <div className="col-md-3 mb-4">

                <div
                    className="card shadow-lg border-0"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center">

                        <h1>👨‍💼</h1>

                        <h2 className="fw-bold">
                            {dashboard.totalEmployees}
                        </h2>

                        <h5>
                            Employees
                        </h5>

                    </div>

                </div>

            </div>

            <div className="col-md-3 mb-4">

                <div
                    className="card shadow-lg border-0"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center">

                        <h1>💼</h1>

                        <h2 className="fw-bold">
                            {dashboard.totalJobPostings}
                        </h2>

                        <h5>
                            Job Postings
                        </h5>

                    </div>

                </div>

            </div>

            <div className="col-md-3 mb-4">

                <div
                    className="card shadow-lg border-0"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center">

                        <h1>🚀</h1>

                        <h2 className="fw-bold">
                            {dashboard.totalApplications}
                        </h2>

                        <h5>
                            Applications
                        </h5>

                    </div>

                </div>

            </div>

        </div>

        {/* Workflow Section */}

        <div
            className="card border-0 shadow-lg mt-4"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                <h3 className="mb-4">
                    Hirelix Workflow
                </h3>

                <div className="row text-center">

                    <div className="col-md-2">
                        <h5>👤</h5>
                        <p>Candidate</p>
                    </div>

                    <div className="col-md-2">
                        <h5>📋</h5>
                        <p>Assigned</p>
                    </div>

                    <div className="col-md-2">
                        <h5>🔍</h5>
                        <p>Job Search</p>
                    </div>

                    <div className="col-md-2">
                        <h5>📄</h5>
                        <p>ATS Resume</p>
                    </div>

                    <div className="col-md-2">
                        <h5>🚀</h5>
                        <p>Applied</p>
                    </div>

                    <div className="col-md-2">
                        <h5>🎯</h5>
                        <p>Interview</p>
                    </div>

                </div>

            </div>

        </div>

    </div>
);
}

export default AdminDashboard;
