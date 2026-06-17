import { useEffect, useState } from "react";
import API from "../services/api";

const emptyProfile = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    education: "",
    university: "",
    graduationYear: "",
    cgpa: "",
    skills: "",
    certifications: "",
    experience: "",
    targetRole: "",
    country: "",
    preferredLocations: "",
    visaStatus: "",
    visaSponsorship: "",
    workAuthorization: "",
    linkedinUrl: ""
};

function CandidatePortal() {
    const [profile, setProfile] = useState(emptyProfile);
    const [candidateId, setCandidateId] = useState(
        localStorage.getItem("accountId") || ""
    );
    const [applications, setApplications] = useState([]);
    const [jobPostings, setJobPostings] = useState([]);
    const [atsResumes, setAtsResumes] = useState([]);
    const [team, setTeam] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const getEmployeeName = (id) => {
        const employee = employees.find((item) => item.id === id);

        if (!employee) {
            return id ? `Employee #${id}` : "Not assigned";
        }

        return `${employee.firstName || ""} ${employee.lastName || ""}`.trim();
    };

    const resolveCandidateId = async () => {
        if (candidateId) {
            return candidateId;
        }

        const username = localStorage.getItem("username");

        if (!username) {
            return "";
        }

        const response = await API.get(
            `/candidates/email/${encodeURIComponent(username)}`,
            authHeaders
        );

        const id = response.data?.id;

        if (id) {
            localStorage.setItem("accountId", id);
            setCandidateId(id);
        }

        return id;
    };

    const loadPortalData = async () => {
        try {
            setLoading(true);
            const id = await resolveCandidateId();

            if (!id) {
                throw new Error("Candidate ID not found. Please login again.");
            }

            const [
                profileResponse,
                applicationsResponse,
                jobsResponse,
                resumesResponse,
                assignmentResponse,
                employeesResponse
            ] = await Promise.all([
                API.get(`/candidates/profile/${id}`, authHeaders),
                API.get(`/applications/candidate/${id}`, authHeaders),
                API.get(`/job-postings/${id}`, authHeaders),
                API.get(`/ats-resumes/candidate/${id}`, authHeaders),
                API.get(`/admin/assignments/candidate/${id}`, authHeaders),
                API.get("/employees", authHeaders)
            ]);

            setProfile({
                ...emptyProfile,
                ...profileResponse.data
            });
            setApplications(applicationsResponse.data || []);
            setJobPostings(jobsResponse.data || []);
            setAtsResumes(resumesResponse.data || []);
            setTeam(assignmentResponse.data || null);
            setEmployees(employeesResponse.data || []);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPortalData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const updateField = (field, value) => {
        setProfile((current) => ({
            ...current,
            [field]: value
        }));
    };

    const updateProfile = async () => {
        try {
            const id = await resolveCandidateId();
            const response = await API.put(
                `/candidates/profile/${id}`,
                profile,
                authHeaders
            );

            setProfile({
                ...emptyProfile,
                ...response.data
            });
            alert("Profile Updated Successfully");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to update profile");
        }
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
                <button className="btn btn-primary me-2">Dashboard</button>
                <button className="btn btn-success me-2">Profile</button>
                <button className="btn btn-info me-2">Applications</button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    borderRadius: "20px",
                    background: "linear-gradient(135deg,#2563eb,#1e3a8a)",
                    color: "white"
                }}
            >
                <div className="card-body p-5">
                    <h1 className="fw-bold">
                        Welcome {profile.firstName || "Candidate"}
                    </h1>
                    <p className="fs-5">
                        Track your applications, resumes, job postings, and
                        assigned Hirelix team.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="alert alert-info">Loading candidate portal...</div>
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h2>{applications.length}</h2>
                                    <p>Applications Submitted</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h2>{atsResumes.length}</h2>
                                    <p>ATS Resumes Created</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card shadow border-0">
                                <div className="card-body text-center">
                                    <h2>{jobPostings.length}</h2>
                                    <p>Jobs Identified</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-lg border-0 mb-4">
                        <div className="card-body">
                            <h3>Assigned Team</h3>
                            <hr />

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="card p-3 shadow-sm">
                                        <h5>Job Searcher</h5>
                                        <p>{getEmployeeName(team?.jobSearcherId)}</p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="card p-3 shadow-sm">
                                        <h5>Resume Specialist</h5>
                                        <p>
                                            {getEmployeeName(
                                                team?.resumeSpecialistId
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="card p-3 shadow-sm">
                                        <h5>Application Specialist</h5>
                                        <p>
                                            {getEmployeeName(
                                                team?.applicationSpecialistId
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-lg border-0 mt-4">
                        <div className="card-body">
                            <h3>Profile & Job Preferences</h3>
                            <hr />

                            <div className="row">
                                <div className="col-md-6">
                                    <label>Skills</label>
                                    <textarea
                                        className="form-control mb-3"
                                        value={profile.skills || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "skills",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label>Certifications</label>
                                    <textarea
                                        className="form-control mb-3"
                                        value={profile.certifications || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "certifications",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label>Experience</label>
                                    <input
                                        className="form-control mb-3"
                                        value={profile.experience || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "experience",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label>Target Role</label>
                                    <input
                                        className="form-control mb-3"
                                        value={profile.targetRole || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "targetRole",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label>Preferred Locations</label>
                                    <input
                                        className="form-control mb-3"
                                        value={profile.preferredLocations || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "preferredLocations",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label>Visa Status</label>
                                    <input
                                        className="form-control mb-3"
                                        value={profile.visaStatus || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "visaStatus",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label>Work Authorization</label>
                                    <input
                                        className="form-control mb-3"
                                        value={profile.workAuthorization || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "workAuthorization",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label>LinkedIn</label>
                                    <input
                                        className="form-control mb-3"
                                        value={profile.linkedinUrl || ""}
                                        onChange={(event) =>
                                            updateField(
                                                "linkedinUrl",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={updateProfile}
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CandidatePortal;
