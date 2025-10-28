import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/StoreContext';
import { ITable } from '../../models/ITable';
import './TableEditor.css';

interface TableEditorProps {
  floor: number;
  onTableSelect?: (table: ITable) => void;
  selectedTableId?: number;
  isEditMode?: boolean;
}

const TableEditor: React.FC<TableEditorProps> = observer(({ 
  floor, 
  onTableSelect, 
  selectedTableId, 
  isEditMode = false 
}) => {
  const { tableStore } = useStore();
  const [draggedTable, setDraggedTable] = useState<ITable | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTable, setNewTable] = useState<Partial<ITable>>({
    number: 1,
    capacity: 4,
    x: 100,
    y: 100,
    width: 80,
    height: 80,
    shape: 'circle',
    isActive: true,
    floor: floor,
    section: ''
  });
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableStore.fetchTables(floor);
  }, [floor, tableStore]);

  const handleMouseDown = (e: React.MouseEvent, table: ITable) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    setDraggedTable(table);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - table.x,
        y: e.clientY - rect.top - table.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedTable || !isEditMode) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      // Обновляем позицию в store
      tableStore.updateTable(draggedTable.id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDraggedTable(null);
  };

  const handleTableClick = (table: ITable) => {
    if (onTableSelect) {
      onTableSelect(table);
    }
  };

  const handleAddTable = async () => {
    try {
      await tableStore.createTable(newTable as Omit<ITable, 'id'>);
      setShowAddForm(false);
      setNewTable({
        number: 1,
        capacity: 4,
        x: 100,
        y: 100,
        width: 80,
        height: 80,
        shape: 'circle',
        isActive: true,
        floor: floor,
        section: ''
      });
    } catch (error) {
      console.error('Ошибка при создании стола:', error);
    }
  };

  const handleDeleteTable = async (tableId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот стол?')) {
      try {
        await tableStore.deleteTable(tableId);
      } catch (error) {
        console.error('Ошибка при удалении стола:', error);
      }
    }
  };

  const handleToggleTableStatus = async (tableId: number) => {
    try {
      await tableStore.toggleTableStatus(tableId);
    } catch (error) {
      console.error('Ошибка при изменении статуса стола:', error);
    }
  };

  const getTableStyle = (table: ITable) => {
    const isSelected = selectedTableId === table.id;
    const isDragging = draggedTable?.id === table.id;
    
    return {
      left: table.x,
      top: table.y,
      width: table.width,
      height: table.height,
      backgroundColor: table.isActive ? '#4CAF50' : '#f44336',
      border: isSelected ? '3px solid #2196F3' : '2px solid #333',
      opacity: isDragging ? 0.7 : 1,
      cursor: isEditMode ? 'move' : 'pointer',
      zIndex: isDragging ? 1000 : 1,
    };
  };

  const getTableShape = (table: ITable) => {
    switch (table.shape) {
      case 'circle':
        return { borderRadius: '50%' };
      case 'oval':
        return { borderRadius: '50%' };
      case 'rectangle':
        return { borderRadius: '8px' };
      default:
        return { borderRadius: '50%' };
    }
  };

  const floorTables = tableStore.getTablesByFloor(floor);

  return (
    <div className="table-editor">
      <div className="table-editor-header">
        <h3>Этаж {floor}</h3>
        {isEditMode && (
          <button 
            className="add-table-btn"
            onClick={() => setShowAddForm(true)}
          >
            Добавить стол
          </button>
        )}
      </div>

      <div 
        ref={canvasRef}
        className="table-canvas"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {floorTables.map((table) => (
          <div
            key={table.id}
            className="table-item"
            style={{
              ...getTableStyle(table),
              ...getTableShape(table)
            }}
            onMouseDown={(e) => handleMouseDown(e, table)}
            onClick={() => handleTableClick(table)}
            title={`Стол №${table.number} (${table.capacity} мест) - ${table.section || 'Без секции'}`}
          >
            <div className="table-number">{table.number}</div>
            <div className="table-capacity">{table.capacity}</div>
            
            {isEditMode && (
              <div className="table-controls">
                <button
                  className="control-btn delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTable(table.id);
                  }}
                  title="Удалить стол"
                >
                  ×
                </button>
                <button
                  className="control-btn toggle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleTableStatus(table.id);
                  }}
                  title={table.isActive ? 'Деактивировать' : 'Активировать'}
                >
                  {table.isActive ? '✓' : '○'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="add-table-form">
          <h4>Добавить новый стол</h4>
          <div className="form-group">
            <label>Номер стола:</label>
            <input
              type="number"
              value={newTable.number}
              onChange={(e) => setNewTable({ ...newTable, number: parseInt(e.target.value) })}
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Вместимость:</label>
            <input
              type="number"
              value={newTable.capacity}
              onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
              min="1"
              max="20"
            />
          </div>
          <div className="form-group">
            <label>Форма:</label>
            <select
              value={newTable.shape}
              onChange={(e) => setNewTable({ ...newTable, shape: e.target.value as any })}
            >
              <option value="circle">Круглый</option>
              <option value="rectangle">Прямоугольный</option>
              <option value="oval">Овальный</option>
            </select>
          </div>
          <div className="form-group">
            <label>Секция:</label>
            <input
              type="text"
              value={newTable.section || ''}
              onChange={(e) => setNewTable({ ...newTable, section: e.target.value })}
              placeholder="Например: Зал №1"
            />
          </div>
          <div className="form-actions">
            <button onClick={handleAddTable} className="save-btn">
              Сохранить
            </button>
            <button onClick={() => setShowAddForm(false)} className="cancel-btn">
              Отмена
            </button>
          </div>
        </div>
      )}

      {tableStore.error && (
        <div className="error-message">
          {tableStore.error}
        </div>
      )}
    </div>
  );
});

export default TableEditor;
