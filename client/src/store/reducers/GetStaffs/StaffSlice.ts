import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStaff } from "../../../models/IStaff";

interface StaffState {
    staffs: IStaff[];
    isLoading: boolean;
    error: string;
}

const initialState: StaffState = {
    staffs: [],
    isLoading: false,
    error: '',
}

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        staffsFetching(state) {
            state.isLoading = true;
        },
        staffsFetchingSuccess(state, action: PayloadAction<IStaff[]>) {
            state.isLoading = false;
            state.error = '';
            state.staffs = action.payload;
        },
        staffsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default staffSlice.reducer;