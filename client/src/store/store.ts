import { combineReducers, configureStore } from "@reduxjs/toolkit";
import staffReducer from './reducers/GetStaffs/StaffSlice';
import loginStaffReducer from './reducers/PostLogin/LoginSlice';
import registrationStaffReducer from './reducers/PostRegistration/RegistrationSlice';
import newsReducer from './reducers/PostNews/NewsSlice';
import getNewsReducer from './reducers/GetNews/GetNewsSlice';


const rootReducer = combineReducers({
    staffReducer,
    loginStaffReducer,
    registrationStaffReducer,
    newsReducer,
    getNewsReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']