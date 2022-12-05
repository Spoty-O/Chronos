import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../services/GlobalContext";

// const events = [
//     {
//         title: "11",
//         date_start: "Wed Dec 21 2022 00:00:00 GMT+0200",
//         date_end: "Sat Dec 24 2022 00:00:00 GMT+0200",
//     },
//     {
//         title: "22",
//         date_start: "Tue Dec 13 2022 00:00:00 GMT+0200",
//         date_end: "TWed Dec 21 2022 00:00:00 GMT+0200",
//     },
//     {
//         title: "33",
//         date_start: "Mon Dec 5 2022 00:00:00 GMT+0200",
//         date_end: "Sat Dec 7 2022 00:00:00 GMT+0200",
//     },
// ];

function EventsArray(events, date) {
    return events.filter((item) => {
        return (
            new Date(item.date_start).getTime() <= new Date(date).getTime() &&
            new Date(date).getTime() <= new Date(item.date_end).getTime()
        );
    });
}

export default function Day({ day, rowIdx, events }) {
    const { setShowEventModal, setDaySelected, setIsCreateEvent } =
        useContext(GlobalContext);

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
                    <div className="event_item" key={index}>
                        {item.title}
                    </div>
                ))}
        </div>
    );
}
