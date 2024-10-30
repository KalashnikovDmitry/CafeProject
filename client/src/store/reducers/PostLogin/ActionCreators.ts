/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ILoginStaff } from "../../../models/ILoginStaff";
import { AppDispatch } from "../../store";
import { loginStaffSlice } from "./LoginSlice";

interface LoginData {
    email: string;
    password: string;
}


export const fetchLoginStaff = (loginData: LoginData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loginStaffSlice.actions.loginStaffFetching())
        const response = await axios.post<ILoginStaff>('http://localhost:5000/auth/login', loginData)
        dispatch(loginStaffSlice.actions.loginStaffFetchingSuccess(response.data));

        return response.data;
    
    } catch (e: any) {
        const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
        dispatch(loginStaffSlice.actions.loginStaffFetchingError(errorMessage));

       throw new Error(errorMessage);
    }
}