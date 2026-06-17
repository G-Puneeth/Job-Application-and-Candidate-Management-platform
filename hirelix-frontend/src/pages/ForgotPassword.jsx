function ForgotPassword() {

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#2563eb,#0f172a)"
            }}
        >

            <div
                className="card shadow-lg p-5"
                style={{
                    width: "500px",
                    borderRadius: "20px"
                }}
            >

                <h2 className="text-center mb-4">
                    Reset Password
                </h2>

                <p className="text-center text-muted">

                    Enter your registered email address.

                </p>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email Address"
                />

                <button
                    className="btn btn-primary w-100"
                >
                    Send Reset Link
                </button>

            </div>

        </div>
    );
}

export default ForgotPassword;