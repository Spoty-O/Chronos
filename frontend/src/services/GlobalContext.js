import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    selectedEvent: null,
    setSelectedEvent: () => {},
    showCalendarModal: false,
    setShowCalendarModal: () => {},
    isCreateCalendar: false,
    setIsCreateCalendar: () => {},
    selectedCalendar: null,
    setSelectedCalendar: () => {},
});

export default GlobalContext;
