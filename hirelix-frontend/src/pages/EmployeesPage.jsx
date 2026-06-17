import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeesPage() {

    const [employees, setEmployees] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const authHeaders = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const normalizeRole = (value) =>
        (value || "")
            .trim()
            .toUpperCase()
            .replace(/[\s-]+/g, "_");

    const fetchEmployees = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await API.get(
                    "/employees",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setEmployees(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load employees");
        }
    };
    const fetchAssignments = async () => {

    try {

        const response =
            await API.get(
                "/admin/assignments",
                authHeaders()
            );

        setAssignments(
            response.data || []
        );

    } catch (error) {

        console.log(error);
    }
};

const fetchApplications = async () => {

    try {

        const response =
            await API.get(
                "/applications",
                authHeaders()
            );

        setApplications(
            response.data || []
        );

    } catch (error) {

        console.log(error);
    }
};

    const fetchCandidates = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await API.get(
                "/candidates",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        setCandidates(
            response.data
        );

    } catch (error) {

        console.log(error);
    }
};

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEmployees();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCandidates();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAssignments();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchApplications();
    }, []);

const assignCandidate = async (
    employee
) => {

    if (
        candidates.length === 0
    ) {

        alert(
            "No Candidates Available"
        );

        return;
    }

    const candidateId =
        prompt(
            `Enter Candidate ID\n\nAvailable Candidates:\n${candidates
                .map(
                    c =>
                        `${c.id} - ${c.firstName} ${c.lastName}`
                )
                .join("\n")}`
        );

    if (!candidateId) {

        return;
    }

    try {

        const token =
            localStorage.getItem(
                "token"
            );

        let payload = {

            candidateId:
                Number(candidateId)
        };

        if (
            normalizeRole(employee.role) ===
            "JOB_SEARCHER"
        ) {

            payload.jobSearcherId =
                employee.id;
        }

        if (
            normalizeRole(employee.role) ===
            "RESUME_SPECIALIST"
        ) {

            payload.resumeSpecialistId =
                employee.id;
        }

        if (
            normalizeRole(employee.role) ===
            "APPLICATION_SPECIALIST"
        ) {

            payload.applicationSpecialistId =
                employee.id;
        }

        await API.post(
            "/admin/assignments",
            payload,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        alert(
            "Candidate Assigned Successfully"
        );

        fetchAssignments();
        fetchApplications();

    } catch (error) {

        console.log(error);

        alert(
            "Assignment Failed"
        );
    }
};

const getEmployeeAssignments = (employee) => {
    if (!employee) {
        return [];
    }

    const roleFieldByRole = {
        JOB_SEARCHER: "jobSearcherId",
        RESUME_SPECIALIST: "resumeSpecialistId",
        APPLICATION_SPECIALIST: "applicationSpecialistId"
    };

    const roleField = roleFieldByRole[normalizeRole(employee.role)];

    if (!roleField) {
        return [];
    }

    return assignments.filter(
        (assignment) =>
            Number(assignment[roleField]) === Number(employee.id)
    );
};

const getCandidateName = (candidateId) => {
    const candidate = candidates.find(
        (item) => Number(item.id) === Number(candidateId)
    );

    if (!candidate) {
        return `Candidate #${candidateId}`;
    }

    return `${candidate.firstName} ${candidate.lastName}`;
};

const getEmployeeApplicationCount = (employee) =>
    applications.filter(
        (application) =>
            Number(application.submittedByEmployeeId) === Number(employee.id)
    ).length;

  return (

    <div
        style={{
            background: "#f4f7fc",
            minHeight: "100vh",
            padding: "30px"
        }}
    >

        {/* Header */}

        <div
            className="card border-0 shadow-lg mb-4"
            style={{
                borderRadius: "20px",
                background:
                    "linear-gradient(135deg,#10b981,#065f46)",
                color: "white"
            }}
        >

            <div className="card-body p-4">

                <h2 className="fw-bold">
                    Employee Management
                </h2>

                <p>
                    Manage Job Searchers, Resume Specialists
                    and Application Specialists.
                </p>

            </div>

        </div>

        {/* Statistics */}

        <div className="row mb-4">

            <div className="col-md-4">

                <div
                    className="card shadow border-0"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center">

                        <h1>👨‍💼</h1>

                        <h3>
                            {employees.length}
                        </h3>

                        <p>
                            Total Employees
                        </p>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div
                    className="card shadow border-0"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center">

                        <h1>🔍</h1>

                        <h3>
                            {
                                employees.filter(
                                    e =>
                                    normalizeRole(e.role) === "JOB_SEARCHER"
                                ).length
                            }
                        </h3>

                        <p>
                            Job Searchers
                        </p>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div
                    className="card shadow border-0"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center">

                        <h1>📄</h1>

                        <h3>
                            {
                                employees.filter(
                                    e =>
                                    normalizeRole(e.role) === "RESUME_SPECIALIST"
                                ).length
                            }
                        </h3>

                        <p>
                            Resume Specialists
                        </p>

                    </div>

                </div>

            </div>

        </div>

        {/* Employee Table */}

        <div
            className="card shadow-lg border-0"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                <h4 className="mb-4">
                    Employee Directory
                </h4>

                <div className="table-responsive">

                    <table
                        className="table table-hover align-middle"
                    >

                        <thead
                            className="table-success"
                        >

                            <tr>

                                <th>ID</th>

                                <th>Employee ID</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {employees.map(
                                (employee) => (

                                    <tr
                                        key={employee.id}
                                    >

                                        <td>
                                            #{employee.id}
                                        </td>

                                        <td>

                                            <strong>
                                                {
                                                    employee.employeeId
                                                }
                                            </strong>

                                        </td>

                                        <td>

                                            {
                                                employee.firstName
                                            }

                                            {" "}

                                            {
                                                employee.lastName
                                            }

                                        </td>

                                        <td>
                                            {
                                                employee.email
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className="badge bg-success"
                                            >
                                                {
                                                    employee.role
                                                }
                                            </span>

                                        </td>

                                        <td>

   <button
    className="btn btn-sm btn-primary me-2"
    onClick={() =>
        setSelectedEmployee(
            employee
        )
    }
>
    View
</button>

    <button
    className="btn btn-sm btn-success me-2"
    onClick={() =>
        assignCandidate(
            employee
        )
    }
>
    Assign Candidate
</button>

</td>
                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
     {
selectedEmployee && (

<div
    className="modal d-block"
    style={{
        background:
            "rgba(0,0,0,0.5)"
    }}
>

    <div className="modal-dialog">

        <div className="modal-content">

            <div className="modal-header">

                <h4>
                    Employee Details
                </h4>

                <button
                    className="btn-close"
                    onClick={() =>
                        setSelectedEmployee(
                            null
                        )
                    }
                />

            </div>

            <div className="modal-body">

                <p>
                    <b>Employee ID:</b>
                    {" "}
                    {
                        selectedEmployee.employeeId
                    }
                </p>

                <p>
                    <b>Name:</b>
                    {" "}
                    {
                        selectedEmployee.firstName
                    }
                    {" "}
                    {
                        selectedEmployee.lastName
                    }
                </p>

                <p>
                    <b>Email:</b>
                    {" "}
                    {
                        selectedEmployee.email
                    }
                </p>

                <p>
                    <b>Role:</b>
                    {" "}
                    {
                        selectedEmployee.role
                    }
                </p>

                <p>
                    <b>Assigned Candidates:</b>
                </p>

                {
                    getEmployeeAssignments(
                        selectedEmployee
                    ).length === 0 ? (
                        <div className="alert alert-warning">
                            No candidates assigned yet.
                        </div>
                    ) : (
                        <ul className="list-group mb-3">
                            {
                                getEmployeeAssignments(
                                    selectedEmployee
                                ).map(
                                    (assignment) => (
                                        <li
                                            className="list-group-item d-flex justify-content-between"
                                            key={assignment.id}
                                        >
                                            <span>
                                                #{assignment.candidateId}
                                            </span>

                                            <span>
                                                {
                                                    getCandidateName(
                                                        assignment.candidateId
                                                    )
                                                }
                                            </span>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    )
                }

                <p>
                    <b>Total Applications:</b>
                    {" "}
                    {
                        getEmployeeApplicationCount(
                            selectedEmployee
                        )
                    }
                </p>

            </div>

        </div>

    </div>

</div>

)}
    </div>
    
);
}

export default EmployeesPage;
