import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [selectedCalendar, setSelectedCalendar] = useState(null);
    const [isCreateCalendar, setIsCreateCalendar] = useState(false);
    const [isCreateEvent, setIsCreateEvent] = useState(false);

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
                showCalendarModal,
                setShowCalendarModal,
                isCreateCalendar,
                setIsCreateCalendar,
                selectedCalendar,
                setSelectedCalendar,
                isCreateEvent,
                setIsCreateEvent,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}
