import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../services/GlobalContext";
import { getMonth, getWeek } from "../services/util";

export default function Calendar() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex } = useContext(GlobalContext);

    // useEffect(() => {
    //     setCurrentMonth(getMonth(monthIndex));
    // }, [monthIndex]);

    return (
        <div className="h-screen flex flex-col">
            <CalendarHeader />
            <div className="flex flex-1 flex-col">
                <Sidebar />
                <div className="grid grid-cols-7 bg-white text-center cursive bold">
                    {getWeek().map((item, idx) => (
                        <p key={idx}>{item}</p>
                    ))}
                </div>
                <Month month={currenMonth} />
            </div>
        </div>
    );
}
