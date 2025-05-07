import React from "react";
import "./AdminSignInPage.css";

export default function AdminSignInPage() {
    return (
        <div className="page-wrapper">
            <div className="auth-shell">
                <section className="panel-left">
                    <img
                        src="/logo-black.svg"
                        alt="logo"
                        className="logo"
                        draggable="false"
                    />

                    <h1>Welcome Back !!</h1>
                    <p>Please enter your credentials to log in</p>

                    <form className="form-group">
                        <input className="input" placeholder="Username" />
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                        />

                        <a href="#" className="forgot">
                            Forgot password?
                        </a>

                        <button type="submit" className="btn-primary">
                            SIGN IN
                        </button>
                    </form>
                </section>

                <section className="panel-right">
                    <img
                        src="/logo-white.svg"
                        alt="logo"
                        className="logo"
                        draggable="false"
                    />

                    <h2 className="brand-name">BookWorm</h2>
                    <h3 className="brand-sub">LIBRARY</h3>

                    <p className="signup-text">
                        New to our platform? Sign Up now.
                    </p>

                    <button className="btn-outline">SIGN UP</button>
                </section>
            </div>
        </div>
    );
}
