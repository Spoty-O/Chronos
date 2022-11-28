import React, { useContext, useState } from "react";
import GlobalContext from "../services/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
    const { title, setTitle } = useState("");
    const { setShowEventModal } = useContext(GlobalContext);
    return (
        <div className="modal">
            <form className="modal__form">
                <header
                    className="bg-gray flex justify-between items-center pxy-15"
                    onClick={() => setShowEventModal(false)}
                >
                    <span className="text-gray">event</span>
                    <button>
                        <span className="text-gray">close</span>
                    </button>
                </header>
                <div className="bg-white pxy-15">
                    <input
                        type="text"
                        name="title"
                        placeholder="Add title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="text-gray"
                    />
                </div>
            </form>
        </div>
    );
}
