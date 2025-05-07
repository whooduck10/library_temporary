// File: BorrowedBooks.jsx
import React from "react";
import "./borrowed.css";
import { Link } from "react-router-dom";

export default function BorrowedBooks() {
    return (
        <div className="page-wrapper">
            <aside className="sidebar">
                <h2>📘</h2>
                <Link to="/returned" className="nav-button">↩️</Link>
            </aside>
            <main className="content">
                <header className="header">
                    <div className="user-info">
                        <strong>Nisal Gunasekara</strong>
                        <span>User</span>
                    </div>
                    <div className="datetime">
                        <span>12:29 PM</span>
                        <span>Sep 02, 2023</span>
                        <button>⚙️</button>
                    </div>
                </header>

                <h1>Borrowed Books</h1>
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th><th>User ID</th><th>Amount</th><th>Due Date</th><th>Date & Time</th><th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(10)].map((_, i) => (
                        <tr key={i}>
                            <td>1</td><td>1</td><td>002 Books</td><td>13 - 03 - 2024</td><td>25-02-2024 10:39:43</td>
                            <td><button className="return-button">Return</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

// File: ReturnedBooks.jsx
