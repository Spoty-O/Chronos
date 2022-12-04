import dayjs from "dayjs";
import React from "react";
import Day from "./Day";

const events = [
    {
        title: "asd",
        DateFrom: "Wed Dec 21 2022 00:00:00 GMT+0200",
        DateTo: "Sat Dec 24 2022 00:00:00 GMT+0200",
    },
    {
        title: "asd",
        DateFrom: "Tue Dec 13 2022 00:00:00 GMT+0200",
        DateTo: "Thu Dec 15 2022 00:00:00 GMT+0200",
    },
    {
        title: "asd",
        DateFrom: "Mon Dec 5 2022 00:00:00 GMT+0200",
        DateTo: "Sat Dec 7 2022 00:00:00 GMT+0200",
    },
];

function GetEventLength(event) {
    return dayjs(event.DateTo).format("D") - dayjs(event.DateFrom).format("D");
}

function getStartIndex(row, ev) {
    return row.findIndex((element) => {
        return (
            element.format("DD/MM/YYYY") ===
            dayjs(ev.DateFrom).format("DD/MM/YYYY")
        );
    });
}

function Ttt({ RowStart, RowEnd = RowStart + 1, ColStart, ColEnd }) {
    if (ColStart === -1) {
        return "";
    }
    return (
        <div
            className="modal__event_item"
            style={{
                gridRowStart: RowStart + 1,
                gridRowEnd: RowEnd + 1,
                gridColumnStart: ColStart + 1,
                gridColumnEnd: ColEnd + ColStart + 2,
            }}
        >
            event
        </div>
    );
}

export default function Month({ month }) {
    return (
        <div className="flex-1 grid grid-rows-5 bg-white">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    <div className="grid grid-cols-7 relative">
                        {row.map((day, idx) => (
                            <Day day={day} key={idx} rowIdx={i} />
                        ))}
                        <div className="modal__event">
                            {events.map((ev, index) => (
                                <Ttt
                                    key={index}
                                    RowStart={1}
                                    ColStart={getStartIndex(row, ev)}
                                    ColEnd={GetEventLength(ev)}
                                />
                            ))}
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}
