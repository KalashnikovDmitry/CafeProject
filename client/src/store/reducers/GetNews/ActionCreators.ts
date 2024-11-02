import axios from "axios";
import { AppDispatch } from "../../store";
import { getNewsSlice } from "./GetNewsSlice";
import { INews } from "../../../models/INews";


export const fetchGetNews = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(getNewsSlice.actions.getNewsFetching())
        const response = await axios.get<INews[]>('http://localhost:5000/news')
        dispatch(getNewsSlice.actions.getNewsSuccess(response.data))

        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
        dispatch(getNewsSlice.actions.getNewsError(errorMessage))
    }
}