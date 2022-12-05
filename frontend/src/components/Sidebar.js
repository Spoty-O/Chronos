import React, { useContext } from "react";
import GlobalContext from "../services/GlobalContext";
import { API } from "../services/ApiService";

export default function Sidebar() {
    const {
        setShowCalendarModal,
        setIsCreateCalendar,
        setSelectedCalendar,
        selectedCalendar,
    } = useContext(GlobalContext);

    const { data: calendars, error } = API.useGetCalendarsQuery();
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
                {calendars &&
                    calendars.map((item, index) => (
                        <div
                            key={index}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setShowCalendarModal(true);
                                setSelectedCalendar(item);
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedCalendar(item);
                            }}
                            className={`${
                                selectedCalendar &&
                                selectedCalendar.id === item.id
                                    ? "active"
                                    : ""
                            } list-item`}
                        >
                            <div className="flex-1 text-center">
                                {item.title}
                            </div>
                            <div
                                className="edit cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowCalendarModal(true);
                                    setSelectedCalendar(item);
                                }}
                            >
                                <span>&#x270E;</span>
                            </div>
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
