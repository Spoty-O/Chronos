import React from "react";
import { API } from "../services/ApiService";
import Day from "./Day";

export default function Month({ month, events }) {
    
    return (
        <div className="flex-1 grid grid-rows-5 grid-cols-7 bg-white relative">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <Day day={day} key={idx} rowIdx={i} events={events} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
