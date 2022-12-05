import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../services/GlobalContext";

const labelsClasses = [
    { title: "Arrangement", color: "bg-indigo text-white" },
    { title: "Reminder", color: "bg-green text-white" },
    { title: "Task", color: "bg-blue text-white" },
];

function EventsArray(events, date) {
    return events.filter((item) => {
        return (
            new Date(item.date_start).getTime() <= new Date(dayjs(date).endOf("D")).getTime() &&
            new Date(date).getTime() <= new Date(item.date_end).getTime()
        );
    });
}

function HolidaysArray(events, date) {
    return events.filter((item) => {
        return (
            new Date(dayjs(item.date).set('year', new Date(date).getFullYear())).getTime() <= new Date(date).getTime() &&
            new Date(date).getTime() <= new Date(dayjs(item.observed).set('year', new Date(date).getFullYear())).getTime()
        );
    });
}

export default function Day({ day, rowIdx, events, holidays }) {
    const {
        setShowEventModal,
        setDaySelected,
        setIsCreateEvent,
        setSelectedEvent,
    } = useContext(GlobalContext);

    // console.log(events);
    function getCurrentDay() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-skyblue text-white"
            : "";
    }
    return (
        <div
            className={`${getCurrentDay()} day_item`}
            onClick={(e) => {
                if (!e.target.classList.contains("event_item")) {
                    setDaySelected(day);
                    setShowEventModal(true);
                    setIsCreateEvent(true);
                }
            }}
        >
            <header className="flex flex-col items-center cursive text-08-rem bold">
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
            {events &&
                EventsArray(events, day).map((item, index) => (
                    <div
                        className={`event_item ${labelsClasses.find(e => e.title == item.type).color}`}
                        key={index}
                        onClick={(e) => {
                            setDaySelected(day);
                            setShowEventModal(true);
                            setIsCreateEvent(false);
                            setSelectedEvent(item);
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            {holidays &&
                HolidaysArray(holidays.events.holidays, day).map((item, index) => (
                    <div
                        className={`event_item bg-yellow`}
                        key={index}
                    >
                        {item.name}
                    </div>
                ))}
        </div>
    );
}
