import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStaff } from "../../../models/IStaff";


interface RegistrationStaffState {
    staff: IStaff | null;
    isLoading: boolean;
    error: string;
}

const initialState: RegistrationStaffState = {
    staff: null,
    isLoading: false,
    error: ''
}

export const registrationStaffSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        loginStaffFetching(state) {
            state.isLoading = true;
        },
        loginStaffFetchingSuccess(state, action: PayloadAction<IStaff>) {
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

export default registrationStaffSlice.reducer;