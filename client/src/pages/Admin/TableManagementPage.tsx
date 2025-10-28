import React from 'react';
import { observer } from 'mobx-react-lite';
import TableLayoutManager from '../../components/TableLayoutManager/TableLayoutManager';

const TableManagementPage: React.FC = observer(() => {
  return (
    <div className="table-management-page">
      <TableLayoutManager />
    </div>
  );
});

export default TableManagementPage;
