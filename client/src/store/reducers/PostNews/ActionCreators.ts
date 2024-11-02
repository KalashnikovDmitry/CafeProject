/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AppDispatch } from "../../store";
import { newsSlice } from "./NewsSlice";
import { INews } from "../../../models/INews";

interface NewsData {
    title: string;
    content: string;
    image: FileList;
}


export const fetchPostNews = (newsData: NewsData) => async (dispatch: AppDispatch) => {
    try {

        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                
            },
            
        }
        
        dispatch(newsSlice.actions.newsFetching())
        const response = await axios.post<INews>('http://localhost:5000/admin/create-news', newsData, config)
        dispatch(newsSlice.actions.newsFetchingSuccess(response.data));

        return response.data;
            
    } catch (e: any) {
        const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
        dispatch(newsSlice.actions.newsFetchingError(errorMessage));

       throw new Error(errorMessage);
    }
}