import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    showEventModal: false,
    setShowEventModal: () => {},
});

export default GlobalContext;
