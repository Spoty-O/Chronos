import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../services/ApiService";

export default function ShareCalendar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [createCalendar, { error }] = API.useCreateCalendarMutation();

    useEffect(() => {
        createCalendar({ id, data: {} });
        navigate("/main");
    }, []);

    return <div>ShareCalendar</div>;
}
