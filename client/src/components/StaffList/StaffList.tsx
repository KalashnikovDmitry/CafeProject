import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStaffs } from '../../store/reducers/GetStaffs/ActionCreators';



const StaffList: React.FC = () => {
 
    const dispatch = useAppDispatch()
    const  {staffs} = useAppSelector(state => state.staffReducer)
    
    useEffect(() => {
        dispatch(fetchStaffs())
    }, [])

  return (
    <>
        {JSON.stringify(staffs, null, 2)}
    </>
    
  );
};

export default StaffList;