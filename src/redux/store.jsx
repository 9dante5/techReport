import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adminSlice } from "./slices/adminSlice";
import { clientsSlice } from "./slices/clientsSlice";
import { servicesSlice } from "./slices/servicesSlice";
import { reportsSlice } from "./slices/reportsSlice";

export const store = configureStore({
    reducer: combineReducers({
        admin: adminSlice.reducer,
        clients: clientsSlice.reducer,
        services:servicesSlice.reducer,
        reports:reportsSlice.reducer,
    }),
    devTools: process.env.NODE_ENV === 'development'
})
    