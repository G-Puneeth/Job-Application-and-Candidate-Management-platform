import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

    try {

        const response =
            await API.post(
                "/auth/login",
                {
                    username: email,
                    password: password
                }
            );
       console.log("LOGIN RESPONSE");
        newFunction(response);
        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "role",
            response.data.role
        );

        localStorage.setItem(
            "username",
            email
        );

        localStorage.setItem(
            "accountId",
            response.data.accountId
        );

        localStorage.setItem(
            "employeeId",
            response.data.accountId
        );

        const role =
            response.data.role;

        if (role === "ADMIN") {

            navigate("/admin");
        }
        else if (role === "CANDIDATE") {

            navigate("/candidate");
        }
        else {

            navigate("/employee");
        }

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Invalid Username or Password"
        );
    }
};

    return (

        <div
            className="container-fluid"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#1e3a8a,#0f172a)"
            }}
        >

            <div className="row min-vh-100">

                {/* Left Section */}

                <div
                    className="col-md-6 d-flex flex-column justify-content-center text-white p-5"
                >

                    <h1
                        className="display-3 fw-bold"
                    >
                        Hirelix Solutions
                    </h1>

                    <h4 className="mt-3">
                        We Apply Jobs For You
                    </h4>

                    <p className="mt-4 fs-5">

                        Focus on learning and career growth.

                        Our dedicated team handles:

                    </p>

                    <ul className="fs-5">

                        <li>
                            Job Search
                        </li>

                        <li>
                            ATS Resume Creation
                        </li>

                        <li>
                            Job Applications
                        </li>

                        <li>
                            Application Tracking
                        </li>

                    </ul>

                </div>

                {/* Right Section */}

                <div
                    className="col-md-6 d-flex justify-content-center align-items-center"
                >

                    <div
                        className="card shadow-lg p-5"
                        style={{
                            width: "450px",
                            borderRadius: "20px"
                        }}
                    >

                        <h2
                            className="text-center mb-3"
                        >
                            Login
                        </h2>

                        <p
                            className="text-center text-muted mb-4"
                        >
                            Access your Hirelix account
                        </p>

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Email or Employee ID"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="btn btn-primary w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <div
                            className="text-center mt-3"
                        >

                            <a
                                href="/forgot-password"
                                style={{
                                    textDecoration:
                                        "none"
                                }}
                            >
                                Forgot Password?
                            </a>

                        </div>

                        <div
                            className="text-center mt-3"
                        >

                            <span>
                                New Candidate?
                            </span>

                            <a
                                href="/register"
                                className="ms-2"
                                style={{
                                    textDecoration:
                                        "none"
                                }}
                            >
                                Register Here
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );

    function newFunction(response) {
        console.log(response.data);
    }
}

export default Login;
