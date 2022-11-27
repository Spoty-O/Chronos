import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../services/GlobalContext";

export default function Day({ day, rowIdx }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    function getCurrentDay() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-skyblue text-white"
            : "";
    }
    return (
        <div className={`${getCurrentDay()} border flex flex-col`}>
            <header className="flex flex-col items-center cursive bold">
                {rowIdx === 0 && day.format("D") > 21 ? (
                    <p className="text-gray calendar-day">{day.format("DD")}</p>
                ) : (
                    <>
                        {rowIdx === 4 && day.format("D") < 21 ? (
                            <p className="text-gray calendar-day">
                                {day.format("DD")}
                            </p>
                        ) : (
                            <p className="calendar-day">{day.format("DD")}</p>
                        )}
                    </>
                )}
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
            >
                {dayEvents.map((evt, idx) => (
                    <div key={idx} onClick={() => setSelectedEvent(evt)}>
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
