import { useState } from "react";

import AdminLayout
    from "../components/AdminLayout";

import AdminDashboard
    from "./AdminDashboard";

import CandidatesPage
    from "./CandidatesPage";

import EmployeesPage
    from "./EmployeesPage";

function AdminPortal() {

    const [page, setPage] =
        useState("dashboard");

    return (

        <AdminLayout
            setPage={setPage}
        >

            {page === "dashboard" &&
                <AdminDashboard />
            }

            {page === "candidates" &&
                <CandidatesPage />
            }

            {page === "employees" &&
                <EmployeesPage />
            }

        </AdminLayout>
    );
}

export default AdminPortal;