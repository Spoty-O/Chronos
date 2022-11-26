import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setCredentials, logOut } from "./AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
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
            "/auth/refresh",
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
    tagTypes: ["Auth", "Event"],
    endpoints: (build) => ({
        // auth
        refreshUser: build.query({
            query: () => ({
                url: "/auth/whoami",
            }),
            invalidatesTags: ["User", "Post", "Comment"],
        }),
        loginUser: build.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Post", "Comment", "User"],
        }),
        registerUser: build.mutation({
            query: (data) => ({
                url: `/auth/register`,
                method: "POST",
                body: data,
            }),
        }),
        logoutUser: build.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Post", "Comment", "User"],
        }),

        // events
        fetchAllEvents: build.query({
            query: () => ({
                url: `/event`,
            }),
            providesTags: (result) => [{ type: "Event" }],
        }),
        fetchOneEvent: build.query({
            query: (id) => ({
                url: `/event/${id}`,
            }),
            providesTags: (result) => [{ type: "Event" }],
        }),
        createEvent: build.mutation({
            query: (data) => ({
                url: `/event`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Event"],
        }),
        updateEvent: build.mutation({
            query: ({ id, content }) => ({
                url: `/event/${id}`,
                method: "PATCH",
                body: { content },
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
    }),
});
