import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                selectedEvent,
                setSelectedEvent,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}
