import dayjs from "dayjs";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { API } from "../services/ApiService";
import { logOut } from "../services/AuthSlice";
import GlobalContext from "../services/GlobalContext";

export default function Header() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    const dispatch = useDispatch();

    const [logoutUser] = API.useLogoutUserMutation();
    const logoutFunc = async (e) => {
        e.stopPropagation();
        await logoutUser();
        dispatch(logOut());
    };

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    function handleTodayMonth() {
        setMonthIndex(dayjs().month());
    }

    return (
        <header className="flex items-center bg-white border pxy-10">
            <h1 className="logo">Chronos</h1>
            <div className="flex-1 flex items-center gap-15">
                <button className="button" onClick={handleTodayMonth}>
                    Today
                </button>
                <button
                    className="border-none bg-white cursor-pointer bold text-20"
                    onClick={handlePrevMonth}
                >
                    &lt;
                </button>
                <button
                    className="border-none bg-white cursor-pointer bold text-20"
                    onClick={handleNextMonth}
                >
                    &gt;
                </button>
                <h3 className="text-gray bold cursive">
                    {dayjs(new Date(dayjs().year(), monthIndex)).format(
                        "MMMM YYYY"
                    )}
                </h3>
            </div>
            <button className="button" onClick={logoutFunc}>Logout</button>
        </header>
    );
}
