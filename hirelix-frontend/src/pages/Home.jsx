import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {

    return (

        <>
            <Navbar />

            {/* Hero Section */}
            <div
                className="text-center text-white"
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#0f172a)",
                    padding: "120px 20px"
                }}
            >

                <h1 className="display-3 fw-bold">
                    We Apply Jobs For You
                </h1>

                <p className="lead">
                    Focus on your career while our experts
                    search jobs, create ATS resumes,
                    and submit applications.
                </p>

            </div>

            {/* About Us */}
            <div className="container mt-5">

                <h2>About Us</h2>

                <p>
                    Hirelix Solutions helps students and
                    professionals save time by managing
                    job applications through dedicated teams.
                </p>

            </div>

            {/* Services */}
            <div className="container mt-5">

                <h2>Services</h2>

                <div className="row">

                    <div className="col-md-4">
                        <div className="card p-3 shadow">
                            <h4>Job Search</h4>
                            <p>Finding relevant jobs daily.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3 shadow">
                            <h4>ATS Resume</h4>
                            <p>Resume optimization for each job.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3 shadow">
                            <h4>Applications</h4>
                            <p>Managed job applications.</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Pricing */}
            <div className="container mt-5">

                <h2>Subscription Plans</h2>

                <div className="row">

                    <div className="col-md-4">
                        <div className="card p-4 shadow">
                            <h3>Basic</h3>
                            <h4>₹999</h4>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-4 shadow">
                            <h3>Premium</h3>
                            <h4>₹2999</h4>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-4 shadow">
                            <h3>Elite</h3>
                            <h4>₹4999</h4>
                        </div>
                    </div>

                </div>

            </div>

            {/* Contact */}
            <div className="container mt-5">

                <h2>Contact Us</h2>

                <p>Email: support@hirelix.com</p>

                <p>Phone: +91 XXXXX XXXXX</p>

            </div>

            <Footer />
        </>
    );
}

export default Home;