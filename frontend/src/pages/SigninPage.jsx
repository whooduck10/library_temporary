import React, { useEffect } from "react";
import "../components/signin.css";
import { useNavigate } from "react-router-dom";
import logoBlack from "../assets/react.svg";
import logoWhite from "../assets/react.svg";

export default function SigninPage() {
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("loggedIn");
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        // You can add real auth validation here
        localStorage.setItem("loggedIn", "true");
        navigate("/dashboard");
    };

    return (
        <div className="page-wrapper">
            <div className="auth-shell">
                {/* LEFT – Sign-in form */}
                <section className="panel-left">
                    <img
                        src={logoBlack}
                        alt="logo"
                        className="logo"
                        draggable="false"
                    />

                    <h1>Welcome Back !!</h1>
                    <p>Please enter your credentials to log in</p>

                    <form className="form-group" onSubmit={handleLogin}>
                        <input className="input" placeholder="Username" />
                        <input className="input" type="password" placeholder="Password" />

                        <a href="#" className="forgot">
                            Forgot password?
                        </a>

                        <button type="submit" className="btn-primary">
                            SIGN IN
                        </button>
                    </form>
                </section>

                {/* RIGHT – Brand & Sign-up */}
                <section className="panel-right">
                    <img
                        src={logoWhite}
                        alt="logo"
                        className="logo"
                        draggable="false"
                    />

                    <h2 className="brand-name">BookWorm</h2>
                    <h3 className="brand-sub">LIBRARY</h3>

                    <p className="signup-text">New to our platform? Sign Up now.</p>

                    <button className="btn-outline">SIGN UP</button>
                </section>
            </div>
        </div>
    );
}
