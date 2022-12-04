import React, { useContext, useState } from "react";
import GlobalContext from "../services/GlobalContext";

export default function CalendarModal() {
    const {
        setShowCalendarModal,
        selectedCalendar,
        setSelectedCalendar,
        isCreateCalendar,
        setIsCreateCalendar,
    } = useContext(GlobalContext);

    console.log(isCreateCalendar, selectedCalendar);
    const [title, setTitle] = useState(
        selectedCalendar ? selectedCalendar.title : ""
    );
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand("copy", true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(selectedCalendar.link)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="modal">
            <form className="modal__form cursive">
                <header className="bg-gray flex justify-between items-center pxy-15">
                    <span>Calendar</span>
                    <span
                        onClick={() => {
                            setShowCalendarModal(false);
                            setIsCreateCalendar(false);
                        }}
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
                    {!isCreateCalendar ? (
                        <div className="flex justify-between text-blue bold text-12">
                            <span
                                className="cursor-pointer"
                                onClick={handleCopyClick}
                            >
                                Copy share link
                            </span>
                            <span className="text-black">
                                {isCopied && "Copied!"}
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {!isCreateCalendar ? (
                        <div className="flex justify-between">
                            <button className="button">update</button>
                            <button className="button">delete</button>
                        </div>
                    ) : (
                        <button className="button">save</button>
                    )}
                </div>
            </form>
        </div>
    );
}
