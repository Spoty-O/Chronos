import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../services/GlobalContext";
import { getMonth, getWeek } from "../services/util";
import EventModal from "./EventModal";
import CalendarModal from "./CalendarModal";
import { API } from "../services/ApiService";
import dayjs from "dayjs";

function MonthComponent({ id, currentMonth }) {
    // console.log(dayjs(currentMonth[0][0].$d).format())
    const { data: events, error } = API.useGetEventsQuery({
        id: id,
        date_start: dayjs(currentMonth[0][0].$d).format(),
        date_end: dayjs(currentMonth[4][6].$d).format(),
    });

    return (
        <div className="flex flex-col flex-1">
            <div className="grid grid-cols-7 bg-white text-center cursive bold text-08-rem border">
                {getWeek().map((item, idx) => (
                    <p key={idx}>{item}</p>
                ))}
            </div>
            <div className="flex flex-col flex-1">
                {events && <Month month={currentMonth} events={events} />}
            </div>
        </div>
    );
}

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal, showCalendarModal, selectedCalendar } =
        useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            {showCalendarModal && <CalendarModal />}
            <div className="h-screen flex flex-col">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    {selectedCalendar !== null && (
                        <MonthComponent
                            id={selectedCalendar.id}
                            currentMonth={currentMonth}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}
