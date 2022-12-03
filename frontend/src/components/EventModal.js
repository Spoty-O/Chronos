import React, { useContext, useState } from "react";
import GlobalContext from "../services/GlobalContext";

const labelsClasses = [
    { title: "arrangement", color: "bg-indigo text-white" },
    { title: "reminder", color: "bg-green text-white" },
    { title: "task", color: "bg-blue text-white" },
];

export default function EventModal() {
    const { setShowEventModal, daySelected, selectedEvent } =
        useContext(GlobalContext);

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

    return (
        <div className="modal">
            <form className="modal__form cursive">
                <header className="bg-gray flex justify-between items-center pxy-15">
                    <span>Event</span>
                    <span onClick={() => setShowEventModal(false)}>close</span>
                </header>
                <div className="bg-white pxy-15 flex flex-col gap-15">
                    <input
                        type="text"
                        name="title"
                        placeholder="Add title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="text-gray cursive"
                    />
                    <p className="text-15">
                        {daySelected.format("dddd, MMMM DD")}
                    </p>
                    <input
                        type="text"
                        name="description"
                        placeholder="Add a description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="text-gray cursive"
                    />
                    <div className="flex gap-10">
                        {labelsClasses.map((item, i) => (
                            <span
                                className={`rounded-5 pxy-5 text-12 border ${
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
                    <button>save</button>
                </div>
            </form>
        </div>
    );
}
