import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { API } from "../services/ApiService";
import GlobalContext from "../services/GlobalContext";

function ShareLink({ id }) {
    const { data, error } = API.useGetShareCalendarLinkQuery(id);
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text) {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand("copy", true, text);
        }
    }

    const handleCopyClick = async () => {
        copyTextToClipboard(data.link)
            .then(() => {
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
        <>
            {data && (
                <div className="flex justify-between text-blue bold text-12">
                    <span className="cursor-pointer" onClick={handleCopyClick}>
                        Copy share link
                    </span>
                    <span className="text-black">{isCopied && "Copied!"}</span>
                </div>
            )}
        </>
    );
}

export default function CalendarModal() {
    const dispatch = useDispatch();
    const {
        setShowCalendarModal,
        selectedCalendar,
        setSelectedCalendar,
        isCreateCalendar,
        setIsCreateCalendar,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedCalendar ? selectedCalendar.title : ""
    );

    const [
        createCalendar,
        { data: createCalendarData, error: createCalendarError },
    ] = API.useCreateCalendarMutation();
    const [updateCalendar, { error: updateCalendarError }] =
        API.useUpdateCalendarMutation();
    const [deleteCalendar] = API.useDeleteCalendarMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        if (isCreateCalendar) {
            await createCalendar({data});
        } else {
            await updateCalendar({
                id: selectedCalendar.id,
                data: data,
            });
        }
    };

    const handleRemove = async (e) => {
        e.preventDefault();
        console.log(selectedCalendar);
        if (window.confirm(`Are you sure?`)) {
            let res = await deleteCalendar(selectedCalendar.id);
            setShowCalendarModal(false);
            setIsCreateCalendar(false);
            setSelectedCalendar(null);
        }
    };

    return (
        <div className="modal">
            <form className="modal__form cursive" onSubmit={handleSubmit}>
                <header className="bg-gray flex justify-between items-center pxy-15">
                    <span>Calendar</span>
                    <span
                        className="cursor-pointer"
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
                    {!isCreateCalendar && selectedCalendar ? (
                        <ShareLink id={selectedCalendar.id} />
                    ) : (
                        ""
                    )}
                    {!isCreateCalendar ? (
                        <div className="flex justify-between">
                            <button className="button">update</button>
                            <button className="button" onClick={handleRemove}>
                                delete
                            </button>
                        </div>
                    ) : (
                        <button className="button">create</button>
                    )}
                    {createCalendarData && (
                        <span style={{ color: "green" }}>
                            {createCalendarData.message}
                        </span>
                    )}

                    <div id="error-box">
                        {createCalendarError &&
                            createCalendarError.data &&
                            createCalendarError.data.message}
                    </div>
                </div>
            </form>
        </div>
    );
}
