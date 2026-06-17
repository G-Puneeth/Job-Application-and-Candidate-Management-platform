function AdminLayout({ children, setPage }) {

    return (

        <div className="container-fluid">

            <div className="row">

                <div
                    className="col-md-2 bg-dark text-white"
                    style={{
                        minHeight: "100vh"
                    }}
                >

                    <h3 className="mt-3">
                        Hirelix
                    </h3>

                    <hr />

                    <button
                        className="btn btn-dark w-100 mb-2"
                        onClick={() =>
                            setPage("dashboard")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        className="btn btn-dark w-100 mb-2"
                        onClick={() =>
                            setPage("candidates")
                        }
                    >
                        Candidates
                    </button>

                    <button
                        className="btn btn-dark w-100 mb-2"
                        onClick={() =>
                            setPage("employees")
                        }
                    >
                        Employees
                    </button>

                </div>

                <div className="col-md-10 p-4">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default AdminLayout;