import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../services/GlobalContext";
import { getMonth, getWeek } from "../services/util";
import EventModal from "./EventModal";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <div className="flex flex-col flex-1">
                        <div className="grid grid-cols-7 bg-white text-center cursive bold text-08-rem border">
                            {getWeek().map((item, idx) => (
                                <p key={idx}>{item}</p>
                            ))}
                        </div>
                        <Month month={currentMonth} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
