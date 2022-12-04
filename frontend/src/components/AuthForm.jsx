import React from "react";
import "./Styles/AuthForm.css";
import { Link } from "react-router-dom";
import { API } from "../services/ApiService";
import { useLocation } from "react-router-dom";
import { setCredentials } from "../services/AuthSlice";
import { useDispatch } from "react-redux";

const AuthForm = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pageType = location.pathname;

    const [loginUser, { error: loginError }] = API.useLoginMutation();
    const [registerUser, { data: registerData, error: registerError }] =
        API.useRegisterMutation();
    const [forgotUser, { error: forgotError }] = API.usePasswordResetMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pageType === "/login") {
            console.log(await new FormData(e.target));
            let res = await loginUser(new FormData(e.target));
            console.log(res);
            dispatch(setCredentials(res));
        } else if (pageType === "/register") {
            await registerUser(new FormData(e.target));
        } else {
            await forgotUser(new FormData(e.target));
        }
    };

    return (
        <div className="auth">
            <form className="login-box" onSubmit={handleSubmit}>
                <h1 className="auth-logo cursive bold">Chronos</h1>
                {pageType !== "/forgot" ? (
                    <div className="input-section">
                        <input
                            className="input-area"
                            type="text"
                            name="login"
                            placeholder="Login"
                            required
                        />
                    </div>
                ) : (
                    ""
                )}
                <div className="input-section">
                    <input
                        className="input-area"
                        type="email"
                        name="email"
                        placeholder="mail@gmail.com"
                        required
                    />
                </div>
                {pageType !== "/forgot" ? (
                    <>
                        <div className="input-section">
                            <input
                                className="input-area"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        {pageType === "/register" ? (
                            <div className="input-section">
                                <input
                                    className="input-area"
                                    type="password"
                                    name="conf_password"
                                    placeholder="Password confirm"
                                    required
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    ""
                )}
                <button className="btn" id="login-btn">
                    {pageType.slice(1)}
                </button>
                {pageType !== "/forgot" ? (
                    <div className="question-box">
                        <Link to="/forgot" className="reg-btn">
                            Forgot password
                        </Link>
                    </div>
                ) : (
                    ""
                )}
                <div className="question-box">
                    <p className="question">
                        {pageType === "/login" ? "New user?" : "Back to login"}
                    </p>
                    <Link
                        to={pageType === "/login" ? "/register" : "/login"}
                        className="reg-btn"
                    >
                        {pageType === "/login" ? "Register" : "Login"}
                    </Link>
                </div>
                {registerData && (
                    <span style={{ color: "green" }}>
                        {registerData.message}
                    </span>
                )}
                {pageType === "/login" && loginError && (
                    <div id="error-box">
                        {loginError.data.message && loginError.data.message}
                    </div>
                )}
                {pageType === "/register" && registerError && (
                    <div id="error-box">
                        {registerError.data.message &&
                            registerError.data.message}
                    </div>
                )}
                {pageType === "/forgot" && forgotError && (
                    <div id="error-box">
                        {forgotError.data.message && forgotError.data.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AuthForm;
