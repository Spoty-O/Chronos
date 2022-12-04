import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../services/GlobalContext";
import { getMonth, getWeek } from "../services/util";
import EventModal from "./EventModal";
import CalendarModal from "./CalendarModal";

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
                    <div className="flex flex-col flex-1">
                        {selectedCalendar !== null && (
                            <>
                                <div className="grid grid-cols-7 bg-white text-center cursive bold text-08-rem border">
                                    {getWeek().map((item, idx) => (
                                        <p key={idx}>{item}</p>
                                    ))}
                                </div>
                                <div className="flex flex-col flex-1">
                                    <Month month={currentMonth} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
