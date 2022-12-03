import dayjs from "dayjs";
import React from "react";
import Day from "./Day";

const events = [
    {
        title: "asd",
        DateFrom: "Mon Dec 19 2022 00:00:00 GMT+0200",
        DateTo: "Sat Dec 7 2022 00:00:00 GMT+0200",
    },
];

function GetEventLength(event) {
    return dayjs(event.DateTo).format("D") - dayjs(event.DateFrom).format("D");
}

function Ttt({
    RowStart = 1,
    RowEnd = RowStart + 1,
    ColStart = 1,
    ColEnd = ColStart + 1,
}) {
    return (
        <div
            className="modal__event_item"
            style={{
                gridRowStart: RowStart + 1,
                gridRowEnd: RowEnd + 1,
                gridColumnStart: ColStart,
                gridColumnEnd: ColEnd,
            }}
        >
            event
        </div>
    );
}

export default function Month({ month }) {
    return (
        <div className="flex-1 grid grid-rows-5 bg-white">
            {/* {console.log(month[0][5], dayjs(events[0].DateFrom))}
            {console.log(dayjs(month[0][5]).d == dayjs(events[0].DateFrom).d)} */}
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    <div className="grid grid-cols-7 relative">
                        {row.map((day, idx) => (
                            <Day day={day} key={idx} rowIdx={i} />
                        ))}
                        <div className="modal__event">
                            {events.map((ev, index) =>
                                console.log(
                                    row.findIndex((element) => {
                                        console.log(typeof element.d);
                                        console.log(
                                            typeof dayjs(ev.DateFrom).d
                                        );
                                        console.log(
                                            element.$d == dayjs(ev.DateFrom).$d
                                        );
                                        return (
                                            element.$d == dayjs(ev.DateFrom).$d
                                        );
                                    })
                                )
                            )}
                            {/* <Ttt RowStart={1} ColStart={1} ColEnd={3} /> */}
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}
