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
    const [isHolidays, setIsHolidays] = useState(true);
    const [isArrangement, setIsArrangement] = useState(true);
    const [isReminder, setIsReminder] = useState(true);
    const [isTask, setIsTask] = useState(true);

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
                isHolidays,
                setIsHolidays,
                isArrangement,
                setIsArrangement,
                isReminder,
                setIsReminder,
                isTask,
                setIsTask,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}
