import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/StoreContext';
import TableEditor from '../TableEditor/TableEditor';
import { ITable } from '../../models/ITable';
import './TableLayoutManager.css';

const TableLayoutManager: React.FC = observer(() => {
  const { tableStore } = useStore();
  const [currentFloor, setCurrentFloor] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTable, setSelectedTable] = useState<ITable | null>(null);
  const [availableFloors, setAvailableFloors] = useState<number[]>([1]);

  useEffect(() => {
    // Загружаем все столы для определения доступных этажей
    tableStore.fetchTables().then(() => {
      const floors = [...new Set(tableStore.tables.map(table => table.floor))];
      setAvailableFloors(floors.length > 0 ? floors.sort() : [1]);
    });
  }, [tableStore]);

  const handleTableSelect = (table: ITable) => {
    setSelectedTable(table);
  };

  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
    setSelectedTable(null);
  };

  const handleAddFloor = () => {
    const newFloor = Math.max(...availableFloors) + 1;
    setAvailableFloors([...availableFloors, newFloor]);
    setCurrentFloor(newFloor);
  };

  const handleRemoveFloor = (floor: number) => {
    if (availableFloors.length <= 1) {
      alert('Нельзя удалить последний этаж');
      return;
    }

    const floorTables = tableStore.getTablesByFloor(floor);
    if (floorTables.length > 0) {
      if (!window.confirm(`На этаже ${floor} есть столы. Удалить этаж и все столы на нем?`)) {
        return;
      }
      
      // Удаляем все столы на этаже
      floorTables.forEach(table => {
        tableStore.deleteTable(table.id);
      });
    }

    setAvailableFloors(availableFloors.filter(f => f !== floor));
    if (currentFloor === floor) {
      setCurrentFloor(availableFloors[0]);
    }
  };

  const getFloorStats = (floor: number) => {
    const floorTables = tableStore.getTablesByFloor(floor);
    const activeTables = floorTables.filter(table => table.isActive);
    const totalCapacity = activeTables.reduce((sum, table) => sum + table.capacity, 0);
    
    return {
      total: floorTables.length,
      active: activeTables.length,
      capacity: totalCapacity
    };
  };

  return (
    <div className="table-layout-manager">
      <div className="layout-header">
        <h2>Управление расположением столов</h2>
        <div className="header-controls">
          <button
            className={`mode-toggle ${isEditMode ? 'active' : ''}`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Режим просмотра' : 'Режим редактирования'}
          </button>
        </div>
      </div>

      <div className="layout-content">
        <div className="floor-selector">
          <h3>Этажи</h3>
          <div className="floor-tabs">
            {availableFloors.map(floor => {
              const stats = getFloorStats(floor);
              return (
                <div
                  key={floor}
                  className={`floor-tab ${currentFloor === floor ? 'active' : ''}`}
                  onClick={() => handleFloorChange(floor)}
                >
                  <div className="floor-number">Этаж {floor}</div>
                  <div className="floor-stats">
                    <span>{stats.active}/{stats.total} столов</span>
                    <span>{stats.capacity} мест</span>
                  </div>
                  {isEditMode && availableFloors.length > 1 && (
                    <button
                      className="remove-floor-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFloor(floor);
                      }}
                      title="Удалить этаж"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
            {isEditMode && (
              <button
                className="add-floor-btn"
                onClick={handleAddFloor}
                title="Добавить этаж"
              >
                + Добавить этаж
              </button>
            )}
          </div>
        </div>

        <div className="editor-container">
          <TableEditor
            floor={currentFloor}
            onTableSelect={handleTableSelect}
            selectedTableId={selectedTable?.id}
            isEditMode={isEditMode}
          />
        </div>

        {selectedTable && (
          <div className="table-details">
            <h4>Информация о столе</h4>
            <div className="table-info">
              <div className="info-item">
                <label>Номер:</label>
                <span>{selectedTable.number}</span>
              </div>
              <div className="info-item">
                <label>Вместимость:</label>
                <span>{selectedTable.capacity} мест</span>
              </div>
              <div className="info-item">
                <label>Форма:</label>
                <span>
                  {selectedTable.shape === 'circle' && 'Круглый'}
                  {selectedTable.shape === 'rectangle' && 'Прямоугольный'}
                  {selectedTable.shape === 'oval' && 'Овальный'}
                </span>
              </div>
              <div className="info-item">
                <label>Этаж:</label>
                <span>{selectedTable.floor}</span>
              </div>
              <div className="info-item">
                <label>Секция:</label>
                <span>{selectedTable.section || 'Не указана'}</span>
              </div>
              <div className="info-item">
                <label>Статус:</label>
                <span className={`status ${selectedTable.isActive ? 'active' : 'inactive'}`}>
                  {selectedTable.isActive ? 'Активен' : 'Неактивен'}
                </span>
              </div>
              <div className="info-item">
                <label>Позиция:</label>
                <span>X: {selectedTable.x}, Y: {selectedTable.y}</span>
              </div>
              <div className="info-item">
                <label>Размер:</label>
                <span>{selectedTable.width} × {selectedTable.height}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {tableStore.isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Загрузка...</p>
        </div>
      )}
    </div>
  );
});

export default TableLayoutManager;
