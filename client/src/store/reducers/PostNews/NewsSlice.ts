import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INews } from "../../../models/INews";


interface newsState {
    news: INews | null;
    isLoading: boolean;
    error: string;
}

const initialState: newsState = {
    news: null,
    isLoading: false,
    error: ''
}

export const newsSlice = createSlice({
    name: 'postNews',
    initialState,
    reducers: {
        newsFetching(state) {
            state.isLoading = true;
        },
        newsFetchingSuccess(state, action: PayloadAction<INews>) {
            state.isLoading = false;
            state.error = '';
            state.news = action.payload;
        },
        newsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default newsSlice.reducer;