import axios from "axios";
import { AppDispatch } from "../../store";
import { IStaff } from "../../../models/IStaff";
import { staffSlice } from "./StaffSlice";


export const fetchStaffs = () => async (dispatch: AppDispatch) => {
    try {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        dispatch(staffSlice.actions.staffsFetching())
        const response = await axios.get<IStaff[]>('http://localhost:5000/admin/staffs', config);
        dispatch(staffSlice.actions.staffsFetchingSuccess(response.data))

        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        const errorMessage = e.response?.data?.message || e.message || "An unknown error occurred";
        dispatch(staffSlice.actions.staffsFetchingError(errorMessage))
    }
}