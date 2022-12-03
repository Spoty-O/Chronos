import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../services/GlobalContext";

export default function Day({ day, rowIdx }) {
    const { setShowEventModal, setDaySelected } = useContext(GlobalContext);
    function getCurrentDay() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-skyblue text-white"
            : "";
    }
    return (
        <div
            className={`${getCurrentDay()} day_item`}
            onClick={() => {
                setDaySelected(day);
                setShowEventModal(true);
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
            <div className="flex-1"></div>
        </div>
    );
}
