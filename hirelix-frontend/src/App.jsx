import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminPortal from "./pages/AdminPortal";
import CandidatePortal from "./pages/CandidatePortal";
import EmployeePortal from "./pages/EmployeePortal";
import CandidatesPage from "./pages/CandidatesPage";
import EmployeesPage from "./pages/EmployeesPage";
function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                 <Route
                    path="/candidate"
                    element={<CandidatePortal />}
                />
                <Route
                    path="/employee"
                    element={<EmployeePortal />}
                 />
                <Route
                    path="/admin"
                    element={<AdminPortal />}
                />
                <Route
                    path="/candidates"
                    element={<CandidatesPage />}
                />
                <Route
                    path="/employees"
                    element={<EmployeesPage />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;