import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storage from "redux-persist/es/storage"
import persistReducer from "redux-persist/es/persistReducer"
import apiSlice from "../apiClient/apiSlice";

const persistConfig={
    key:"root",
    storage,
    blackList:[apiSlice.reducerPath]
}

const reducers=combineReducers({
    auth:authSlice,
    [apiSlice.reducerPath]:apiSlice.reducer
})

const persistedReducer=persistReducer(persistConfig,reducers)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware)
})

