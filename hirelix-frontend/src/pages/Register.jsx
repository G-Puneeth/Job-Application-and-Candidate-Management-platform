import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    education: "",
    university: "",
    graduationYear: "",
    cgpa: "",
    targetRole: "",
    skills: "",
    certifications: "",
    experience: "",
    country: "",
    preferredLocations: "",
    visaStatus: "",
    visaSponsorship: "",
    workAuthorization: "",
    linkedinUrl: ""
};

const subscriptionPlans = [
    {
        id: "starter",
        name: "Starter",
        price: 199,
        description: "Profile setup and application tracking"
    },
    {
        id: "career",
        name: "Career",
        price: 499,
        description: "Job search, ATS resume, and applications"
    },
    {
        id: "premium",
        name: "Premium",
        price: 999,
        description: "Priority job search and full application support"
    }
];

function Register() {
    const [form, setForm] = useState(initialForm);
    const [resumeFile, setResumeFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showSubscriptions, setShowSubscriptions] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState("career");
    const navigate = useNavigate();

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    };

    const uploadResume = async () => {
        if (!resumeFile) {
            return "";
        }

        const data = new FormData();
        data.append("file", resumeFile);

        const response = await API.post("/files/upload", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    };

    const validateRegistration = () => {
      
        if (!form.firstName || !form.email || !form.password) {
            alert("First name, email, and password are required");
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        if (!validateRegistration()) {
            return;
        }

        setShowSubscriptions(true);
    };

    const processPaymentAndRegister = async () => {
        if (!validateRegistration()) {
            return;
        }

        const selectedPlan = subscriptionPlans.find(
            (plan) => plan.id === selectedPlanId
        );

        if (!selectedPlan) {
            alert("Please select a subscription plan");
            return;
        }

        try {
            setSubmitting(true);
            const paymentResponse = await API.post("/payments/checkout", {
                planId: selectedPlan.id,
                planName: selectedPlan.name,
                amount: selectedPlan.price,
                candidateEmail: form.email
            });

            if (!paymentResponse.data?.paid) {
                alert(paymentResponse.data?.message || "Payment failed");
                return;
            }

            const resumeFilePath = await uploadResume();

            await API.post("/candidates/register", {
                ...form,
                resumeFilePath,
                subscriptionPlan: selectedPlan.name,
                paymentStatus: "PAID",
                paymentTransactionId: paymentResponse.data.transactionId
            });

            alert("Payment completed and registration submitted successfully");
            navigate("/");
        } catch (error) {

    console.log("REGISTER ERROR:", error);

    console.log(
        "RESPONSE:",
        error.response?.data
    );

    alert(
        error.response?.data ||
        error.message ||
        "Registration failed"
    );
}finally {
            setSubmitting(false);
        }
    };

    const input = (field, placeholder, type = "text") => (
        <input
            type={type}
            className="form-control mb-3"
            placeholder={placeholder}
            value={form[field]}
            onChange={(event) => updateField(field, event.target.value)}
        />
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg,#2563eb,#0f172a)",
                padding: "40px"
            }}
        >
            <div className="container">
                <div
                    className="card shadow-lg p-5"
                    style={{
                        borderRadius: "20px"
                    }}
                >
                    <h2 className="text-center mb-4">
                        Candidate Registration
                    </h2>

                    <h4>Personal Information</h4>

                    <div className="row">
                        <div className="col-md-6">
                            {input("firstName", "First Name")}
                        </div>

                        <div className="col-md-6">
                            {input("lastName", "Last Name")}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            {input("email", "Email")}
                        </div>

                        <div className="col-md-6">
                            {input("phone", "Phone")}
                        </div>
                    </div>

                    {input("password", "Password", "password")}

                    <h4>Education</h4>

                    <div className="row">
                        <div className="col-md-6">
                            {input("education", "Education")}
                        </div>

                        <div className="col-md-6">
                            {input("university", "University")}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            {input("graduationYear", "Graduation Year")}
                        </div>

                        <div className="col-md-6">
                            {input("cgpa", "CGPA")}
                        </div>
                    </div>

                    <h4>Professional Information</h4>

                    {input("targetRole", "Target Role")}

                    <textarea
                        className="form-control mb-3"
                        placeholder="Skills"
                        rows="3"
                        value={form.skills}
                        onChange={(event) =>
                            updateField("skills", event.target.value)
                        }
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Certifications"
                        rows="3"
                        value={form.certifications}
                        onChange={(event) =>
                            updateField("certifications", event.target.value)
                        }
                    />

                    <textarea
                        className="form-control mb-4"
                        placeholder="Experience"
                        rows="3"
                        value={form.experience}
                        onChange={(event) =>
                            updateField("experience", event.target.value)
                        }
                    />

                    <h4>Location Preferences</h4>

                    {input("country", "Country")}
                    {input("preferredLocations", "Preferred Locations")}

                    <h4>Visa Information</h4>

                    {input("visaStatus", "Visa Status")}
                    {input("visaSponsorship", "Visa Sponsorship")}
                    {input("workAuthorization", "Work Authorization")}

                    <h4>LinkedIn</h4>

                    {input("linkedinUrl", "LinkedIn URL")}

                    <h4>Resume Upload</h4>

                    <input
                        type="file"
                        className="form-control mb-4"
                        onChange={(event) =>
                            setResumeFile(event.target.files?.[0] || null)
                        }
                    />

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleRegister}
                        disabled={submitting}
                    >
                        Continue To Subscription
                    </button>

                    {showSubscriptions && (
                        <div className="mt-4">
                            <h4>Choose Subscription</h4>

                            <div className="row">
                                {subscriptionPlans.map((plan) => (
                                    <div
                                        className="col-md-4 mb-3"
                                        key={plan.id}
                                    >
                                        <button
                                            type="button"
                                            className={`card h-100 w-100 text-start ${
                                                selectedPlanId === plan.id
                                                    ? "border-primary"
                                                    : ""
                                            }`}
                                            style={{
                                                borderRadius: "8px",
                                                borderWidth: "2px"
                                            }}
                                            onClick={() =>
                                                setSelectedPlanId(plan.id)
                                            }
                                        >
                                            <div className="card-body">
                                                <h5>{plan.name}</h5>
                                                <h3>₹{plan.price}</h3>
                                                <p className="mb-0">
                                                    {plan.description}
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="btn btn-success w-100"
                                onClick={processPaymentAndRegister}
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Processing Payment..."
                                    : "Pay And Register"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
