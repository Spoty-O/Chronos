import React, { useContext } from "react";
import GlobalContext from "../services/GlobalContext";
export default function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    return (
        <header className="flex items-center bg-white border gap-15 pxy-10">
            <h1>Calendar</h1>
            <button className="border bg-white pxy-10 rounded-5 cursor-pointer">
                Today
            </button>
            <button
                className="border-none bg-white cursor-pointer bold text-20"
                onClick={handlePrevMonth}
            >
                &lt;
            </button>
            <button
                className="border-none bg-white cursor-pointer bold text-20"
                onClick={handleNextMonth}
            >
                &gt;
            </button>
        </header>
    );
}
