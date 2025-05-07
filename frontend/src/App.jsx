import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import BorrowedBooks from "./pages/BorrowedBooks.jsx";
import ReturnedBooks from "./pages/ReturnedBooks.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SigninPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/borrowed" element = {<BorrowedBooks/>}/>
                <Route path="/returned" element = {<ReturnedBooks/>}/>

            </Routes>
        </Router>
    );
}

export default App;
