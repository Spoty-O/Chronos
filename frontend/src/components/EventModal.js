import React, { useContext, useState } from "react";
import GlobalContext from "../services/GlobalContext";

// const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
    const { setShowEventModal, daySelected, selectedEvent } =
        useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );

    return (
        <div className="modal">
            <form className="modal__form cursive">
                <header className="bg-gray flex justify-between items-center pxy-15">
                    <span>Event</span>
                    <span
                        onClick={() => setShowEventModal(false)}
                    >
                        close
                    </span>
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
                    <button>save</button>
                </div>
            </form>
        </div>
    );
}
