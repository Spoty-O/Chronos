import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { API } from "../services/ApiService";
import GlobalContext from "../services/GlobalContext";
import MaterialUIPickers from "./Date";

const labelsClasses = [
    { title: "Arrangement", color: "bg-indigo text-white" },
    { title: "Reminder", color: "bg-green text-white" },
    { title: "Task", color: "bg-blue text-white" },
];

export default function EventModal() {
    const {
        setShowEventModal,
        daySelected,
        selectedEvent,
        selectedCalendar,
        isCreateEvent,
        setIsCreateEvent,
    } = useContext(GlobalContext);

    const [createEvent, { error: createEventError }] =
        API.useCreateEventMutation();

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );

    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((item) => item === selectedEvent.label)
            : labelsClasses[0]
    );

    const [valueStart, setValueStart] = useState(
        dayjs(daySelected).startOf("D")
    );
    const [valueEnd, setValueEnd] = useState(dayjs(daySelected).endOf("D"));

    const handleChangeStart = (newValue) => {
        setValueStart(newValue);
    };
    const handleChangeEnd = (newValue) => {
        setValueEnd(newValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        data.append("date_start", valueStart);
        data.append("date_end", valueEnd);
        data.append("type", selectedLabel);

        if (isCreateEvent) {
            await createEvent({
                id: selectedCalendar.id,
                data: data,
            });
        } else {
            // console.log(selectedCalendar.id);
            // await updateCalendar({
            //     id: selectedCalendar.id,
            //     data: new FormData(e.target),
            // });
        }
    };

    return (
        <div className="modal">
            <form className="modal__form cursive" onSubmit={handleSubmit}>
                <header className="bg-gray flex justify-between items-center pxy-15">
                    <span>Event</span>
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            setShowEventModal(false);
                            setIsCreateEvent(false);
                        }}
                    >
                        close
                    </span>
                </header>
                <div className="bg-white pxy-15 flex flex-col gap-20">
                    <input
                        type="text"
                        name="title"
                        placeholder="Add title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="text-20 cursive"
                    />
                    <MaterialUIPickers
                        label={"Date from"}
                        handleChange={handleChangeStart}
                        value={valueStart}
                    />
                    <MaterialUIPickers
                        label={"Date to"}
                        handleChange={handleChangeEnd}
                        value={valueEnd}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Add a description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="cursive text-15"
                    />
                    <div className="flex gap-10">
                        {labelsClasses.map((item, i) => (
                            <span
                                className={`flex-1 text-center rounded-5 pxy-5 text-15 border ${
                                    selectedLabel === item.title
                                        ? item.color
                                        : ""
                                }`}
                                key={i}
                                onClick={() => setSelectedLabel(item.title)}
                            >
                                {item.title}
                            </span>
                        ))}
                    </div>
                    <button className="text-15">
                        {isCreateEvent ? "save" : "update"}
                    </button>
                    {createEventError && (
                        <div id="error-box">
                            {createEventError.data &&
                                createEventError.data.message}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
