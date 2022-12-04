import React, { useContext } from "react";
import GlobalContext from "../services/GlobalContext";
import { API } from "../services/ApiService";

let calendars = [
    { title: "calendar1", link: "copylink1" },
    { title: "calendar2", link: "copylink2" },
    { title: "calendar3", link: "copylink3" },
];

export default function Sidebar() {
    const {
        setShowCalendarModal,
        setIsCreateCalendar,
        setSelectedCalendar,
        selectedCalendar,
    } = useContext(GlobalContext);

    const { data: calendar, isLoading, error } = API.useGetCalendarsQuery();
    console.log(calendar, error);
    return (
        <aside className="aside">
            <button
                className="button"
                onClick={() => {
                    setShowCalendarModal(true);
                    setIsCreateCalendar(true);
                }}
            >
                Create Calendar
            </button>
            <div className="lists">
                <span className="cursive text-center border-bottom">
                    Calendars:
                </span>
                {calendars.map((item, index) => (
                    <div
                        className={`${
                            selectedCalendar === index ? "active" : ""
                        } list-item`}
                        key={index}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setShowCalendarModal(true);
                            setSelectedCalendar(item);
                        }}
                        onClick={() => setSelectedCalendar(index)}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div className="lists">
                <span className="cursive text-center border-bottom">
                    Events:
                </span>
                <div className="flex flex-col pxy-15 gap-15">
                    <label className="label">
                        <input
                            type="checkbox"
                            className="event_checkbox"
                            name="holidays"
                        />
                        <span>Holidays</span>
                    </label>
                    <label className="label">
                        <input type="checkbox" className="event_checkbox" />
                        <span>Arrangement</span>
                    </label>
                    <label className="label">
                        <input type="checkbox" className="event_checkbox" />
                        <span>Reminder</span>
                    </label>
                    <label className="label">
                        <input type="checkbox" className="event_checkbox" />
                        <span>Task</span>
                    </label>
                </div>
            </div>
        </aside>
    );
}
