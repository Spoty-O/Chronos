import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setCredentials, logOut } from "./AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        console.log(getState());
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        console.log("sending refresh token");
        const refreshResult = await baseQuery(
            "/auth/refresh-token",
            api,
            extraOptions
        );
        if (refreshResult.data) {
            api.dispatch(setCredentials({ data: refreshResult.data }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const API = createApi({
    reducerPath: "API",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Auth", "Event", "Calendar"],
    endpoints: (build) => ({
        getRefreshToken: build.query({
            query: () => ({
                url: `/auth/refresh`,
            }),
            providesTags: (result) => [{ type: ["Auth", "Calendar"] }],
        }),

        // auth
        login: build.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Event"],
        }),
        register: build.mutation({
            query: (data) => ({
                url: `/auth/register`,
                method: "POST",
                body: data,
            }),
        }),
        passwordReset: build.mutation({
            query: (data) => ({
                url: `/auth/password-reset`,
                method: "POST",
                body: data,
            }),
        }),
        passwordResetConfirm: build.mutation({
            query: (data) => ({
                url: `/auth/password-reset/${data.token}`,
                method: "POST",
                body: data.data,
            }),
        }),
        passwordConfirm: build.mutation({
            query: (data) => ({
                url: `/auth/password-confirm/${data.id}`,
                method: "POST",
            }),
        }),
        logoutUser: build.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Event", "Calendar"],
        }),

        // events
        getEvents: build.query({
            query: ({ id, date_start, date_end }) => ({
                url: `/event`,
                params: {
                    id: id,
                    date_start: date_start,
                    date_end: date_end,
                },
            }),
            providesTags: (result) => [{ type: "Event" }],
        }),
        getShareEventLink: build.query({
            query: ({ id }) => ({
                url: `/event/${id}`,
            }),
            providesTags: (result) => [{ type: "Event" }],
        }),
        createEvent: build.mutation({
            query: (data) => ({
                url: `/event/${data.id}`,
                method: "POST",
                body: data.data,
            }),
            invalidatesTags: ["Event"],
        }),
        updateEvent: build.mutation({
            query: (data) => ({
                url: `/event/${data.id}`,
                method: "PATCH",
                body: data.data,
            }),
            invalidatesTags: ["Event"],
        }),
        deleteEvent: build.mutation({
            query: (data) => ({
                url: `/event/${data.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Event"],
        }),

        // calendar
        getCalendars: build.query({
            query: () => ({
                url: `/calendar`,
            }),
            providesTags: (result) => [{ type: "Calendar" }],
        }),
        getShareCalendarLink: build.query({
            query: (id) => ({
                url: `/calendar/link/${id}`,
            }),
            providesTags: (result) => [{ type: "Calendar" }],
        }),
        createCalendar: build.mutation({
            query: (data) => ({
                url: `/calendar`,
                method: "POST",
                body: data.data,
                params: {
                    id: data.id,
                },
            }),
            invalidatesTags: ["Calendar"],
        }),
        updateCalendar: build.mutation({
            query: (data) => ({
                url: `/calendar/${data.id}`,
                method: "PATCH",
                body: data.data,
            }),
            invalidatesTags: ["Calendar"],
        }),
        deleteCalendar: build.mutation({
            query: (id) => ({
                url: `/calendar/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Calendar"],
        }),
    }),
});
