import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeePortal() {
    const storedRole = localStorage.getItem("role") || "";
    const normalizeRole = (value) =>
        (value || "")
            .trim()
            .toUpperCase()
            .replace(/[\s-]+/g, "_");

    const role = normalizeRole(storedRole);
    const employeeId = localStorage.getItem("accountId");
    const token = localStorage.getItem("token");
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const [workspace, setWorkspace] = useState([]);
    const [selectedCandidateId, setSelectedCandidateId] = useState("");
    const [selectedJobPostingId, setSelectedJobPostingId] = useState("");
    const [selectedAtsResumeId, setSelectedAtsResumeId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [resumePath, setResumePath] = useState("");
    const [applicationStatus, setApplicationStatus] = useState("APPLIED");
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const workspacePathByRole = {
        JOB_SEARCHER: "job-searcher",
        RESUME_SPECIALIST: "resume-specialist",
        APPLICATION_SPECIALIST: "application-specialist"
    };
   const deleteAssignment = async (candidateId) => {

    try {

        await API.delete(
            `/assignments/candidate/${candidateId}`,
            authHeaders
        );

        alert("Assignment Deleted");

        loadWorkspace();

    } catch (error) {

        console.log(error);

        alert("Failed To Delete Assignment");
    }
};
    const loadWorkspace = async () => {
        try {
            setLoading(true);
            const path = workspacePathByRole[role];

            if (!path || !employeeId) {
                setWorkspace([]);
                return;
            }

            const response = await API.get(
                `/workspace/${path}/${employeeId}`,
                authHeaders
            );

            setWorkspace(response.data || []);
        } catch (error) {

    console.log("EMPLOYEE ERROR:", error);

    console.log(
        "STATUS:",
        error.response?.status
    );

    console.log(
        "DATA:",
        error.response?.data
    );

    alert(
        error.response?.data ||
        error.message
    );
}finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadWorkspace();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const firstCandidateId = () => workspace[0]?.candidateId || "";

    const saveJobPosting = async () => {
        const candidateId = selectedCandidateId || firstCandidateId();

        if (!candidateId) {
            alert("Please select an assigned candidate");
            return;
        }

        try {
            await API.post(
                "/job-postings",
                {
                    companyName,
                    jobTitle: jobRole,
                    jobUrl,
                    candidateId: Number(candidateId),
                    submittedByEmployeeId: Number(employeeId)
                },
                authHeaders
            );

            setCompanyName("");
            setJobRole("");
            setJobUrl("");
            alert("Job Posting Saved");
            loadWorkspace();
        } catch (error) {
            console.log(error);
            alert("Failed To Save Job");
        }
    };
    const uploadATSResume = async () => {

    console.log(
        "UPLOAD FUNCTION STARTED"
    );

    if (!resumePath) {

        alert(
            "Please select a resume file"
        );

        return "";
    }

    const token =
        localStorage.getItem(
            "token"
        );

    const data =
        new FormData();

    data.append(
        "file",
        resumePath
    );

    console.log(
        "Selected File:",
        resumePath
    );

    const response =
        await API.post(
            "/files/upload",
            data,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );

    console.log(
        "UPLOAD RESPONSE:",
        response.data
    );

    return response.data;
};
    const saveATSResume = async () => {

    console.log("SAVE ATS RESUME CLICKED");

    const candidateId =
        selectedCandidateId ||
        firstCandidateId();

    console.log(
        "Candidate:",
        candidateId
    );

    console.log(
        "Job Posting:",
        selectedJobPostingId
    );

    if (
        !candidateId ||
        !selectedJobPostingId
    ) {

        alert(
            "Please select candidate and job posting"
        );

        return;
    }

    try {

        const uploadedFilePath =
            await uploadATSResume();

        console.log(
            "Uploaded File:",
            uploadedFilePath
        );

        await API.post(
            "/ats-resumes",
            {
                candidateId:
                    Number(candidateId),

                jobPostingId:
                    Number(
                        selectedJobPostingId
                    ),

                resumePath:
                    uploadedFilePath,

                submittedByEmployeeId:
                    Number(employeeId)
            },
            authHeaders
        );

        alert(
            "ATS Resume Saved"
        );

        setResumePath("");

        loadWorkspace();

    } catch (error) {

        console.log(
            "ATS ERROR:",
            error
        );

        console.log(
            "STATUS:",
            error.response?.status
        );

        console.log(
            "DATA:",
            error.response?.data
        );

        alert(
            error.response?.data ||
            error.message
        );
    }
};

    const saveApplication = async () => {
        const candidateId = selectedCandidateId || firstCandidateId();

        if (!candidateId || !selectedJobPostingId || !selectedAtsResumeId) {
            alert("Please select candidate, job posting, and ATS resume");
            return;
        }

        try {
            await API.post(
                "/applications",
                {
                    candidateId: Number(candidateId),
                    jobPostingId: Number(selectedJobPostingId),
                    atsResumeId: Number(selectedAtsResumeId),
                    applicationStatus,
                    submittedByEmployeeId: Number(employeeId)
                },
                authHeaders
            );

            alert("Application Saved");
            loadWorkspace();
        } catch (error) {
            console.log(error);
            alert("Failed To Save Application");
        }
    };

    const renderCandidateOptions = () =>
        workspace.map((item) => (
            <option key={item.candidateId} value={item.candidateId}>
                Candidate #{item.candidateId}
                {item.firstName ?  ` - ${item.firstName} ${item.lastName}` : ""}
            </option>
        ));

    const selectedWorkspaceItem =
        workspace.find(
            (item) => String(item.candidateId) === String(selectedCandidateId)
        ) || workspace[0];
     console.log(
    "APPLICATION WORKSPACE:",
    workspace
);
const openCandidateProfile = (candidate) => {
console.log("VIEW BUTTON CLICKED");
    console.log(candidate);
    setSelectedCandidate(candidate);
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
                <button className="btn btn-success me-2">Workspace</button>
                <button className="btn btn-primary me-2">
                    Assigned Candidates
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    borderRadius: "20px",
                    background: "linear-gradient(135deg,#10b981,#065f46)",
                    color: "white"
                }}
            >
                <div className="card-body p-5">
                    <h1 className="fw-bold">Employee Workspace</h1>
                    <h4>{role}</h4>
                </div>
            </div>

            {loading && (
                <div className="alert alert-info">Loading workspace...</div>
            )}

            {!loading && workspace.length === 0 && (
                <div className="alert alert-warning">
                    No candidates assigned yet.
                </div>
            )}

            {!loading && role === "JOB_SEARCHER" && (
                <div className="card shadow-lg border-0">
                    <div className="card-body">
                        <h3>Job Search Workspace</h3>
                        <hr />

                        <h5>Assigned Candidates</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Candidate</th>
                                    <th>Target Role</th>
                                    <th>Skills</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workspace.map((item) => (
                                    <tr key={item.candidateId}>
                                        <td>#{item.candidateId}</td>
                                        <td>{item.targetRole}</td>
                                        <td>{item.skills}</td>
                                        <td>{item.preferredLocations}</td>
                                         <td>
        <button
            className="btn btn-danger btn-sm"
            onClick={() =>
                deleteAssignment(
                    item.candidateId
                )
            }
        >
            Delete
        </button>
    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h5 className="mt-4">Add Job Posting</h5>

                        <select
                            className="form-control mb-2"
                            value={selectedCandidateId}
                            onChange={(event) =>
                                setSelectedCandidateId(event.target.value)
                            }
                        >
                            <option value="">Select Candidate</option>
                            {renderCandidateOptions()}
                        </select>

                        <input
                            className="form-control mb-2"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(event) =>
                                setCompanyName(event.target.value)
                            }
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Job Role"
                            value={jobRole}
                            onChange={(event) => setJobRole(event.target.value)}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Job URL"
                            value={jobUrl}
                            onChange={(event) => setJobUrl(event.target.value)}
                        />

                        <button
                            className="btn btn-success"
                            onClick={saveJobPosting}
                        >
                            Save Job
                        </button>
                    </div>
                </div>
            )}

            {!loading && role === "RESUME_SPECIALIST" && (
                <div className="card shadow-lg border-0">
                    <div className="card-body">
                        <h3>ATS Resume Workspace</h3>
                        <hr />

                        <select
                            className="form-control mb-2"
                            value={selectedCandidateId}
                            onChange={(event) => {
                                setSelectedCandidateId(event.target.value);
                                setSelectedJobPostingId("");
                            }}
                        >
                            <option value="">Select Candidate</option>
                            {renderCandidateOptions()}
                        </select>
                        
                        <select
    className="form-control mb-2"
    value={selectedJobPostingId}
    onChange={(event) =>
        setSelectedJobPostingId(
            event.target.value
        )
    }
>
    <option value="">
        Select Job Posting
    </option>

    {(selectedWorkspaceItem?.jobs || []).map(
        (job) => (
            <option
                key={job.id}
                value={job.id}
            >
                #{job.id} - {job.companyName}
                {" - "}
                {job.jobTitle}
            </option>
        )
    )}
</select>

{selectedJobPostingId && (

    <div
        className="card border-0 shadow-sm mb-3"
    >

        <div className="card-body">

            <h6>
                Selected Job Details
            </h6>

            <hr />

            <p>

                <b>Company:</b>
                {" "}
                {
                    selectedWorkspaceItem?.jobs?.find(
                        (job) =>
                            String(job.id) ===
                            String(selectedJobPostingId)
                    )?.companyName
                }

            </p>

            <p>

                <b>Role:</b>
                {" "}
                {
                    selectedWorkspaceItem?.jobs?.find(
                        (job) =>
                            String(job.id) ===
                            String(selectedJobPostingId)
                    )?.jobTitle
                }

            </p>

            <p>

                <b>Job URL:</b>
                {" "}

                <a
                    href={
                        selectedWorkspaceItem?.jobs?.find(
                            (job) =>
                                String(job.id) ===
                                String(selectedJobPostingId)
                        )?.jobUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                >
                    Open Job
                </a>

            </p>

        </div>

    </div>

)}

                        <input
    type="file"
    className="form-control mb-3"
    accept=".pdf,.doc,.docx"
    onChange={(event) => {

        const file =
            event.target.files?.[0];

        if (file) {

            setResumePath(file);
        }
    }}
/>

                        <button
                            className="btn btn-primary"
                            onClick={saveATSResume}
                        >
                            Save Resume
                        </button>
                    </div>
                </div>
            )}

            {!loading && role === "APPLICATION_SPECIALIST" && (
                <div className="card shadow-lg border-0">
                    <div className="card-body">
                        <h3>Application Workspace</h3>
                        <hr />
                        <div className="card mb-4">
    <div className="card-body">

        <h4 className="mb-4">
            Assigned Candidates
        </h4>

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

                    {workspace.map((candidate) => (

                        <tr key={candidate.candidateId}>

                            <td>
                                #{candidate.candidateId}
                            </td>

                            <td>
                                <strong>
                                    {candidate.firstName}
                                    {" "}
                                    {candidate.lastName}
                                </strong>
                            </td>

                            <td>
                                {candidate.email}
                            </td>

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
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        openCandidateProfile(candidate)
                                    }
                                >
                                    View
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </div>
</div>
                        <select
                            className="form-control mb-2"
                            value={selectedCandidateId}
                            onChange={(event) => {
                                setSelectedCandidateId(event.target.value);
                                setSelectedJobPostingId("");
                                setSelectedAtsResumeId("");
                            }}
                        >
                            <option value="">Select Candidate</option>
                            {renderCandidateOptions()}
                        </select>

                        <select
                            className="form-control mb-2"
                            value={selectedJobPostingId}
                            onChange={(event) =>
                                setSelectedJobPostingId(event.target.value)
                            }
                        >
                            <option value="">Select Job Posting</option>
                            {(selectedWorkspaceItem?.jobs || []).map((job) => (
                                <option key={job.id} value={job.id}>
    #{job.id}
    {" - "}
    {job.companyName}
    {" - "}
    {job.jobTitle}
</option>
                       
                            ))}
                        </select>
                        {selectedJobPostingId && (

<div className="card mb-3">

    <div className="card-body">

        <h6>Job Details</h6>

        <p>
            <b>Company:</b>{" "}
            {
                selectedWorkspaceItem?.jobs?.find(
                    job =>
                        String(job.id) ===
                        String(selectedJobPostingId)
                )?.companyName
            }
        </p>

        <p>
            <b>Role:</b>{" "}
            {
                selectedWorkspaceItem?.jobs?.find(
                    job =>
                        String(job.id) ===
                        String(selectedJobPostingId)
                )?.jobTitle
            }
        </p>

        <p>
            <b>Job URL:</b>
        </p>

        <input
            className="form-control mb-2"
            readOnly
            value={
                selectedWorkspaceItem?.jobs?.find(
                    job =>
                        String(job.id) ===
                        String(selectedJobPostingId)
                )?.jobUrl || ""
            }
        />

        <a
            href={
                selectedWorkspaceItem?.jobs?.find(
                    job =>
                        String(job.id) ===
                        String(selectedJobPostingId)
                )?.jobUrl
            }
            target="_blank"
            rel="noreferrer"
            className="btn btn-success btn-sm"
        >
            Open Job
        </a>

    </div>

</div>

)}
                        {selectedJobPostingId && (

<div className="card mb-3">

    <div className="card-body">

        <h5>Selected Job Details</h5>

        <hr />

        <p>

            <b>Company:</b>
            {" "}
            {
                selectedWorkspaceItem?.jobs?.find(
                    job =>
                        String(job.id) ===
                        String(selectedJobPostingId)
                )?.companyName
            }

        </p>

        <p>

            <b>Role:</b>
            {" "}
            {
                selectedWorkspaceItem?.jobs?.find(
                    job =>
                        String(job.id) ===
                        String(selectedJobPostingId)
                )?.jobTitle
            }

        </p>

        <p>

            <b>Job URL:</b>
            {" "}

            <a
                href={
                    selectedWorkspaceItem?.jobs?.find(
                        job =>
                            String(job.id) ===
                            String(selectedJobPostingId)
                    )?.jobUrl
                }
                target="_blank"
                rel="noreferrer"
            >
                Open Job
            </a>

        </p>

    </div>

</div>

)}
                        <select
                            className="form-control mb-2"
                            value={selectedAtsResumeId}
                            onChange={(event) =>
                                setSelectedAtsResumeId(event.target.value)
                            }
                        >
                            <option value="">Select ATS Resume</option>
                            {(selectedWorkspaceItem?.resumes || []).map(
                                (resume) => (
                                    <option key={resume.id} value={resume.id}>
                                     Resume #{resume.id}
                                     {" - "}
                                     {resume.resumePath}
                                    </option>
                                )
                            )}
                        </select>
                         {selectedAtsResumeId && (

<div className="card mb-3">

    <div className="card-body">

        <h6>Selected ATS Resume</h6>

        <p>

            <b>Resume File:</b>
            {" "}

            {
                selectedWorkspaceItem?.resumes?.find(
                    r =>
                        String(r.id) ===
                        String(selectedAtsResumeId)
                )?.resumePath
            }

        </p>

        <a
    href={`http://localhost:8080${
        selectedWorkspaceItem?.resumes?.find(
            r =>
                String(r.id) ===
                String(selectedAtsResumeId)
        )?.resumePath
    }`}
    target="_blank"
    rel="noreferrer"
    className="btn btn-primary btn-sm"
>
    Open Resume
</a>

    </div>

</div>

)}
                        <select
                            className="form-control mb-3"
                            value={applicationStatus}
                            onChange={(event) =>
                                setApplicationStatus(event.target.value)
                            }
                        >
                            <option value="APPLIED">APPLIED</option>
                            <option value="INTERVIEW">INTERVIEW</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="SELECTED">SELECTED</option>
                        </select>

                        <button
                            className="btn btn-warning"
                            onClick={saveApplication}
                        >
                            Save Application
                        </button>
                    </div>
                </div>
            )}
        
    
{selectedCandidate && (

<div
    className="modal d-block"
    style={{
        background:
            "rgba(0,0,0,0.5)"
    }}
>

    <div className="modal-dialog modal-lg">

        <div className="modal-content">

            <div className="modal-header">

                <h4>
                    Candidate Profile
                </h4>

                <button
                    className="btn-close"
                    onClick={() =>
                        setSelectedCandidate(
                            null
                        )
                    }
                />

            </div>

            <div className="modal-body">

                <h5>
                    Personal Information
                </h5>

                <hr />

                <p>
                    <b>Name:</b>{" "}
                    {
                        selectedCandidate.firstName
                    }{" "}
                    {
                        selectedCandidate.lastName
                    }
                </p>

                <p>
                    <b>Email:</b>{" "}
                    {
                        selectedCandidate.email
                    }
                </p>

                <p>
                    <b>Phone:</b>{" "}
                    {
                        selectedCandidate.phone
                    }
                </p>

                <h5>
                    Education
                </h5>

                <hr />

                <p>
                    <b>Education:</b>{" "}
                    {
                        selectedCandidate.education
                    }
                </p>

                <p>
                    <b>University:</b>{" "}
                    {
                        selectedCandidate.university
                    }
                </p>

                <p>
                    <b>Graduation Year:</b>{" "}
                    {
                        selectedCandidate.graduationYear
                    }
                </p>

                <p>
                    <b>CGPA:</b>{" "}
                    {
                        selectedCandidate.cgpa
                    }
                </p>

                <h5>
                    Professional Details
                </h5>

                <hr />

                <p>
                    <b>Skills:</b>{" "}
                    {
                        selectedCandidate.skills
                    }
                </p>

                <p>
                    <b>Certifications:</b>{" "}
                    {
                        selectedCandidate.certifications
                    }
                </p>

                <p>
                    <b>Experience:</b>{" "}
                    {
                        selectedCandidate.experience
                    }
                </p>

                <p>
                    <b>Target Role:</b>{" "}
                    {
                        selectedCandidate.targetRole
                    }
                </p>

                <h5>
                    Location & Visa
                </h5>

                <hr />

                <p>
                    <b>Country:</b>{" "}
                    {
                        selectedCandidate.country
                    }
                </p>

                <p>
                    <b>Preferred Locations:</b>{" "}
                    {
                        selectedCandidate.preferredLocations
                    }
                </p>

                <p>
                    <b>Visa Status:</b>{" "}
                    {
                        selectedCandidate.visaStatus
                    }
                </p>

                <p>
                    <b>Visa Sponsorship:</b>{" "}
                    {
                        selectedCandidate.visaSponsorship
                    }
                </p>

                <p>
                    <b>Work Authorization:</b>{" "}
                    {
                        selectedCandidate.workAuthorization
                    }
                </p>

                <p>
                    <b>LinkedIn:</b>{" "}
                    {
                        selectedCandidate.linkedinUrl
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
export default EmployeePortal;
