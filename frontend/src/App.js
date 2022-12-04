import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
// import { useSelector } from "react-redux";
import Calendar from "./components/Calendar";
import ContextWrapper from "./services/ContextWrapper";

function App() {
    // let { isAuth } = useSelector((state) => state.auth);
    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route
                        path="/test"
                        element={
                            <ContextWrapper>
                                <Calendar />
                            </ContextWrapper>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <ContextWrapper>
                                <AuthForm />
                            </ContextWrapper>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <ContextWrapper>
                                <AuthForm />
                            </ContextWrapper>
                        }
                    />
                    <Route
                        path="/forgot"
                        element={
                            <ContextWrapper>
                                <AuthForm />
                            </ContextWrapper>
                        }
                    />
                    <Route path="*" element={<Navigate to="/test" replace />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
