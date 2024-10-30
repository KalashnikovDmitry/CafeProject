import { combineReducers, configureStore } from "@reduxjs/toolkit";
import staffReducer from './reducers/GetStaffs/StaffSlice';
import loginStaffReducer from './reducers/PostLogin/LoginSlice';
import registrationStaffReducer from './reducers/PostRegistration/RegistrationSlice';


const rootReducer = combineReducers({
    staffReducer,
    loginStaffReducer,
    registrationStaffReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']