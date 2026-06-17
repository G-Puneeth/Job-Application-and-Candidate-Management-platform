import { useEffect, useState } from "react";
import API from "../services/api";

function CandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedCandidateStats, setSelectedCandidateStats] = useState({
        applications: 0,
        jobPostings: 0,
        atsResumes: 0
    });
    const [showAssignment, setShowAssignment] = useState(false);
    const [jobSearcherId, setJobSearcherId] = useState("");
    const [resumeSpecialistId, setResumeSpecialistId] = useState("");
    const [applicationSpecialistId, setApplicationSpecialistId] = useState("");
    const normalizeRole = (value) =>
        (value || "")
            .trim()
            .toUpperCase()
            .replace(/[\s-]+/g, "_");

    const fetchCandidates = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.get("/candidates", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCandidates(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load candidates");
        }
    };

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.get("/employees", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEmployees(response.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCandidates();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEmployees();
    }, []);

    const closeAssignment = () => {
        setShowAssignment(false);
        setSelectedCandidate(null);
        setJobSearcherId("");
        setResumeSpecialistId("");
        setApplicationSpecialistId("");
    };

    const assignCandidate = async () => {
        if (!selectedCandidate) {
            alert("Please select a candidate first");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/admin/assignments",
                {
                    candidateId: selectedCandidate.id,
                    jobSearcherId: Number(jobSearcherId),
                    resumeSpecialistId: Number(resumeSpecialistId),
                    applicationSpecialistId: Number(applicationSpecialistId)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Candidate Assigned Successfully");
            closeAssignment();
        } catch (error) {
            console.log(error);
            alert("Assignment Failed");
        }
    };

    const openAssignment = (candidate) => {
        setSelectedCandidate(candidate);
        setShowAssignment(true);
    };

    const openCandidateProfile = async (candidate) => {
        setSelectedCandidate(candidate);
        setShowAssignment(false);

        try {
            const token = localStorage.getItem("token");
            const [applications, jobs, resumes] = await Promise.all([
                API.get(`/applications/candidate/${candidate.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),
                API.get(`/job-postings/${candidate.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),
                API.get(`/ats-resumes/candidate/${candidate.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            ]);

            setSelectedCandidateStats({
                applications: applications.data?.length || 0,
                jobPostings: jobs.data?.length || 0,
                atsResumes: resumes.data?.length || 0
            });
        } catch (error) {
            console.log(error);
            setSelectedCandidateStats({
                applications: 0,
                jobPostings: 0,
                atsResumes: 0
            });
        }
    };

    const getResumeUrl = (resumeFilePath) => {
        if (!resumeFilePath) {
            return "";
        }

        if (resumeFilePath.startsWith("http")) {
            return resumeFilePath;
        }

        if (resumeFilePath.startsWith("/api/")) {
            return `${API.defaults.baseURL.replace("/api", "")}${resumeFilePath}`;
        }

        const fileName = resumeFilePath.split(/[\\/]/).pop();

        return `${API.defaults.baseURL}/files/${encodeURIComponent(fileName)}`;
    };

    const openResume = (candidate) => {
        if (candidate.resumeFilePath) {
            window.open(getResumeUrl(candidate.resumeFilePath), "_blank");
            return;
        }

        alert("Resume Not Uploaded");
    };

    return (
        <div
            style={{
                background: "#f4f7fc",
                minHeight: "100vh",
                padding: "30px"
            }}
        >
            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    borderRadius: "20px",
                    background: "linear-gradient(135deg,#2563eb,#1e3a8a)",
                    color: "white"
                }}
            >
                <div className="card-body p-4">
                    <h2 className="fw-bold">Candidate Management</h2>
                    <p>View and manage all registered candidates in Hirelix.</p>
                </div>
            </div>

            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Candidate..."
                    />
                </div>
            </div>

            <div
                className="card shadow-lg border-0"
                style={{
                    borderRadius: "20px"
                }}
            >
                <div className="card-body">
                    <h4 className="mb-4">Registered Candidates</h4>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-primary">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Target Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {candidates.map((candidate) => (
                                    <tr key={candidate.id}>
                                        <td>#{candidate.id}</td>
                                        <td>
                                            <strong>
                                                {candidate.firstName}{" "}
                                                {candidate.lastName}
                                            </strong>
                                        </td>
                                        <td>{candidate.email}</td>
                                        <td>
                                            <span className="badge bg-primary">
                                                {candidate.targetRole}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-success">
                                                Active
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() =>
                                                    openCandidateProfile(
                                                        candidate
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    openAssignment(candidate)
                                                }
                                            >
                                                Assign
                                            </button>

                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() =>
                                                    openResume(candidate)
                                                }
                                            >
                                                Resume
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedCandidate && !showAssignment && (
                <div
                    className="modal d-block"
                    style={{
                        background: "rgba(0,0,0,0.5)"
                    }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Candidate Profile</h4>
                                <button
                                    className="btn-close"
                                    onClick={() => setSelectedCandidate(null)}
                                />
                            </div>

                            <div className="modal-body">
                                <h5>Personal Information</h5>
                                <hr />

                                <p>
                                    <b>Name:</b> {selectedCandidate.firstName}{" "}
                                    {selectedCandidate.lastName}
                                </p>
                                <p>
                                    <b>Email:</b> {selectedCandidate.email}
                                </p>
                                <p>
                                    <b>Phone:</b> {selectedCandidate.phone}
                                </p>

                                <h5>Education</h5>
                                <hr />

                                <p>
                                    <b>Education:</b>{" "}
                                    {selectedCandidate.education}
                                </p>
                                <p>
                                    <b>University:</b>{" "}
                                    {selectedCandidate.university}
                                </p>
                                <p>
                                    <b>Graduation Year:</b>{" "}
                                    {selectedCandidate.graduationYear}
                                </p>
                                <p>
                                    <b>CGPA:</b> {selectedCandidate.cgpa}
                                </p>

                                <h5>Professional Details</h5>
                                <hr />

                                <p>
                                    <b>Skills:</b> {selectedCandidate.skills}
                                </p>
                                <p>
                                    <b>Certifications:</b>{" "}
                                    {selectedCandidate.certifications}
                                </p>
                                <p>
                                    <b>Experience:</b>{" "}
                                    {selectedCandidate.experience}
                                </p>
                                <p>
                                    <b>Target Role:</b>{" "}
                                    {selectedCandidate.targetRole}
                                </p>

                                <h5>Location & Visa</h5>
                                <hr />

                                <p>
                                    <b>Country:</b> {selectedCandidate.country}
                                </p>
                                <p>
                                    <b>Preferred Locations:</b>{" "}
                                    {selectedCandidate.preferredLocations}
                                </p>
                                <p>
                                    <b>Visa Status:</b>{" "}
                                    {selectedCandidate.visaStatus}
                                </p>
                                <p>
                                    <b>Visa Sponsorship:</b>{" "}
                                    {selectedCandidate.visaSponsorship}
                                </p>
                                <p>
                                    <b>Work Authorization:</b>{" "}
                                    {selectedCandidate.workAuthorization}
                                </p>
                                <p>
                                    <b>LinkedIn:</b>{" "}
                                    {selectedCandidate.linkedinUrl}
                                </p>

                                <h5>Activity</h5>
                                <hr />

                                <p>
                                    <b>Applications Submitted:</b>{" "}
                                    {selectedCandidateStats.applications}
                                </p>

                                <p>
                                    <b>Jobs Found:</b>{" "}
                                    {selectedCandidateStats.jobPostings}
                                </p>

                                <p>
                                    <b>ATS Resumes Created:</b>{" "}
                                    {selectedCandidateStats.atsResumes}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAssignment && (
                <div
                    className="modal d-block"
                    style={{
                        background: "rgba(0,0,0,0.5)"
                    }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Assign Candidate</h4>
                                <button
                                    className="btn-close"
                                    onClick={closeAssignment}
                                />
                            </div>

                            <div className="modal-body">
                                <select
                                    className="form-control mb-2"
                                    value={jobSearcherId}
                                    onChange={(event) =>
                                        setJobSearcherId(event.target.value)
                                    }
                                >
                                    <option value="">Select Job Searcher</option>
                                    {employees
                                        .filter(
                                            (employee) =>
                                                normalizeRole(employee.role) ===
                                                "JOB_SEARCHER"
                                        )
                                        .map((employee) => (
                                            <option
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.firstName}{" "}
                                                {employee.lastName} - #
                                                {employee.id}
                                            </option>
                                        ))}
                                </select>

                                <select
                                    className="form-control mb-2"
                                    value={resumeSpecialistId}
                                    onChange={(event) =>
                                        setResumeSpecialistId(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select Resume Specialist
                                    </option>
                                    {employees
                                        .filter(
                                            (employee) =>
                                                normalizeRole(employee.role) ===
                                                "RESUME_SPECIALIST"
                                        )
                                        .map((employee) => (
                                            <option
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.firstName}{" "}
                                                {employee.lastName} - #
                                                {employee.id}
                                            </option>
                                        ))}
                                </select>

                                <select
                                    className="form-control mb-3"
                                    value={applicationSpecialistId}
                                    onChange={(event) =>
                                        setApplicationSpecialistId(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select Application Specialist
                                    </option>
                                    {employees
                                        .filter(
                                            (employee) =>
                                                normalizeRole(employee.role) ===
                                                "APPLICATION_SPECIALIST"
                                        )
                                        .map((employee) => (
                                            <option
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.firstName}{" "}
                                                {employee.lastName} - #
                                                {employee.id}
                                            </option>
                                        ))}
                                </select>

                                <button
                                    className="btn btn-success me-2"
                                    onClick={assignCandidate}
                                >
                                    Save Assignment
                                </button>

                                <button
                                    className="btn btn-secondary"
                                    onClick={closeAssignment}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CandidatesPage;
