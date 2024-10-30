import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginStaff } from "../../../models/ILoginStaff";


interface LoginStaffState {
    staff: ILoginStaff;
    isLoading: boolean;
    error: string;
}

const initialState: LoginStaffState = {
    staff: {email: '', password: ''},
    isLoading: false,
    error: ''
}

export const loginStaffSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStaffFetching(state) {
            state.isLoading = true;
        },
        loginStaffFetchingSuccess(state, action: PayloadAction<ILoginStaff>) {
            state.isLoading = false;
            state.error = '';
            state.staff = action.payload;
        },
        loginStaffFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default loginStaffSlice.reducer;