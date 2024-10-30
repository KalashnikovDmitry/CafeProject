import { FC } from "react"
import StaffList from "../../components/StaffList/StaffList";
import style from './style.module.scss';

const StaffPage:FC = () => {
    return (
        <div className={style.mTopStaff}>
            <StaffList/>
        </div>
    );
};

export default StaffPage;