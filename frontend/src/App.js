import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import Calendar from "./components/Calendar";

function App() {
    // let { isAuth } = useSelector((state) => state.auth);
    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route path="/test" element={<Calendar />} />
                    <Route path="*" element={<Navigate to="/test" replace />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
