/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AppDispatch } from "../../store";
import { registrationStaffSlice } from "./RegistrationSlice";
import { IStaff } from "../../../models/IStaff";

interface RegistrationData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}


export const fetchRegistrationStaff = (registrationData: RegistrationData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(registrationStaffSlice.actions.loginStaffFetching())
        const response = await axios.post<IStaff>('http://localhost:5000/auth/registration', registrationData)
        dispatch(registrationStaffSlice.actions.loginStaffFetchingSuccess(response.data));

        //return response.data;
    
    } catch (e: any) {
        const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
        dispatch(registrationStaffSlice.actions.loginStaffFetchingError(errorMessage));

       throw new Error(errorMessage);
    }
}