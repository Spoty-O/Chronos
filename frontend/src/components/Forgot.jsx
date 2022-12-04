import React from "react";
import "./Styles/AuthForm.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { API } from "../services/ApiService";
import { setCredentials } from "../services/AuthSlice";
import { useDispatch } from "react-redux";

const ForgotForm = () => {
    const dispatch = useDispatch();
    const { jwt } = useParams();

    API.useGetRefreshTokenQuery();

    const [resetConfirm, { error }] = API.usePasswordResetConfirmMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res = await resetConfirm({
            token: jwt,
            data: new FormData(e.target),
        });
        console.log(res);
        dispatch(setCredentials(res));
    };

    return (
        <div className="auth">
            <form className="login-box" onSubmit={handleSubmit}>
                <h1 className="auth-logo cursive bold">Chronos</h1>
                <div className="input-section">
                    <input
                        className="input-area"
                        type="password"
                        name="new_password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="input-section">
                    <input
                        className="input-area"
                        type="password"
                        name="password_conf"
                        placeholder="Password confirm"
                        required
                    />
                </div>

                <button className="btn" id="login-btn">
                    change
                </button>
                <div className="question-box">
                    <p className="question">Back to login</p>
                    <Link to={"/login"} className="reg-btn">
                        {"Login"}
                    </Link>
                </div>
                {error && (
                    <div id="error-box">
                        {error.data.message && error.data.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ForgotForm;
