import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStaffs } from '../../store/reducers/GetStaffs/ActionCreators';
import style from './style.module.scss';



const StaffList: React.FC = () => {

  const dispatch = useAppDispatch();
  const { staffs } = useAppSelector((state) => state.staffReducer);

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);

  return (
    <div className={style['staff-list-container']}>
    <h2 className={style['staff-list-title']}>Сотрудники</h2>
    <ul className={style['staff-list']}>
      {staffs && staffs.length > 0 ? (
        staffs.map((staff) => (
          <li key={staff.id} className={style['staff-list-item']}>
            <div className={style['staff-details']}>
              <h3 className={style['staff-name']}>{staff.name}</h3>
              <p className={style['staff-role']}>{staff.role}</p>
              <p className={style['staff-email']}>{staff.email}</p>
              <p className={style['staff-email']}>{staff.phone}</p>
            </div>
          </li>
        ))
      ) : (
        <p className={style['no-staff-message']}>Сотрудники не найдены.</p>
      )}
    </ul>
  </div>
  );
};

export default StaffList;