import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INews } from "../../../models/INews";

interface NewsState {
    news: INews[];
    isLoading: boolean;
    error: string;
}

const initialState: NewsState = {
    news: [],
    isLoading: false,
    error: '',
}

export const getNewsSlice = createSlice({
    name: 'get-news-list',
    initialState,
    reducers: {
        getNewsFetching(state) {
            state.isLoading = true;
        },
        getNewsSuccess(state, action: PayloadAction<INews[]>) {
            state.isLoading = false;
            state.error = '';
            state.news = action.payload;
        },
        getNewsError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default getNewsSlice.reducer;