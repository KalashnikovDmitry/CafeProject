import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/StoreContext';
import { ITable } from '../../models/ITable';
import { IBooking } from '../../models/IBooking';
import './TableBooking.css';

interface TableBookingProps {
  onBookingSelect?: (table: ITable) => void;
  selectedDate?: string;
  selectedTime?: string;
  partySize?: number;
}

const TableBooking: React.FC<TableBookingProps> = observer(({ 
  onBookingSelect, 
  selectedDate, 
  selectedTime, 
  partySize = 1 
}) => {
  const { tableStore, bookingStore } = useStore();
  const [currentFloor, setCurrentFloor] = useState(1);
  const [selectedTable, setSelectedTable] = useState<ITable | null>(null);
  const [availableFloors, setAvailableFloors] = useState<number[]>([1]);
  const [bookedTables, setBookedTables] = useState<Set<number>>(new Set());
  const [hoveredTable, setHoveredTable] = useState<ITable | null>(null);

  useEffect(() => {
    // Загружаем все столы
    tableStore.fetchTables().then(() => {
      const floors = [...new Set(tableStore.tables.map(table => table.floor))];
      setAvailableFloors(floors.length > 0 ? floors.sort() : [1]);
    });
  }, [tableStore]);

  useEffect(() => {
    // Загружаем бронирования для выбранной даты и времени
    if (selectedDate && selectedTime) {
      loadBookingsForDateTime(selectedDate, selectedTime);
    }
  }, [selectedDate, selectedTime, bookingStore]);

  const loadBookingsForDateTime = async (date: string, time: string) => {
    try {
      const bookings = await bookingStore.getBookingsByDate(date) as IBooking[];
      const bookingsForTime = bookings.filter((booking: IBooking) => booking.time === time);
      const bookedTableNumbers = new Set<number>(bookingsForTime.map((booking: IBooking) => booking.tableNumber));
      setBookedTables(bookedTableNumbers);
    } catch (error) {
      console.error('Ошибка при загрузке бронирований:', error);
    }
  };

  const handleTableClick = (table: ITable) => {
    if (!table.isActive) return;
    
    const isBooked = bookedTables.has(table.number);
    if (isBooked) return;

    if (table.capacity < partySize) {
      alert(`Стол №${table.number} вмещает только ${table.capacity} человек, а ваша компания ${partySize} человек`);
      return;
    }

    setSelectedTable(table);
    if (onBookingSelect) {
      onBookingSelect(table);
    }
  };

  const getTableStatus = (table: ITable) => {
    if (!table.isActive) return 'inactive';
    if (bookedTables.has(table.number)) return 'booked';
    if (table.capacity < partySize) return 'too-small';
    if (selectedTable?.id === table.id) return 'selected';
    return 'available';
  };

  const getTableStyle = (table: ITable) => {
    const status = getTableStatus(table);
    const isHovered = hoveredTable?.id === table.id;
    
    let backgroundColor = '#4CAF50'; // available
    let cursor = 'pointer';
    
    switch (status) {
      case 'inactive':
        backgroundColor = '#9E9E9E';
        cursor = 'not-allowed';
        break;
      case 'booked':
        backgroundColor = '#f44336';
        cursor = 'not-allowed';
        break;
      case 'too-small':
        backgroundColor = '#FF9800';
        cursor = 'not-allowed';
        break;
      case 'selected':
        backgroundColor = '#2196F3';
        break;
    }

    return {
      left: table.x,
      top: table.y,
      width: table.width,
      height: table.height,
      backgroundColor,
      cursor,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      zIndex: selectedTable?.id === table.id ? 1000 : 1,
      border: selectedTable?.id === table.id ? '3px solid #1976D2' : '2px solid #333',
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

  const getStatusText = (table: ITable) => {
    const status = getTableStatus(table);
    switch (status) {
      case 'inactive':
        return 'Неактивен';
      case 'booked':
        return 'Забронирован';
      case 'too-small':
        return `Мал для ${partySize} чел.`;
      case 'selected':
        return 'Выбран';
      case 'available':
        return 'Доступен';
      default:
        return '';
    }
  };

  const floorTables = tableStore.getTablesByFloor(currentFloor);

  return (
    <div className="table-booking">
      <div className="booking-header">
        <h3>Выберите стол</h3>
        {selectedDate && selectedTime && (
          <div className="booking-info">
            <span>Дата: {selectedDate}</span>
            <span>Время: {selectedTime}</span>
            <span>Гостей: {partySize}</span>
          </div>
        )}
      </div>

      <div className="floor-selector">
        <div className="floor-tabs">
          {availableFloors.map(floor => {
            const floorTables = tableStore.getTablesByFloor(floor);
            const availableCount = floorTables.filter(table => 
              table.isActive && 
              !bookedTables.has(table.number) && 
              table.capacity >= partySize
            ).length;
            
            return (
              <button
                key={floor}
                className={`floor-tab ${currentFloor === floor ? 'active' : ''}`}
                onClick={() => setCurrentFloor(floor)}
              >
                Этаж {floor}
                <span className="available-count">({availableCount} доступно)</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="table-canvas">
        {floorTables.map((table) => (
          <div
            key={table.id}
            className="table-item"
            style={{
              ...getTableStyle(table),
              ...getTableShape(table)
            }}
            onClick={() => handleTableClick(table)}
            onMouseEnter={() => setHoveredTable(table)}
            onMouseLeave={() => setHoveredTable(null)}
            title={`Стол №${table.number} (${table.capacity} мест) - ${getStatusText(table)}`}
          >
            <div className="table-number">{table.number}</div>
            <div className="table-capacity">{table.capacity}</div>
            <div className="table-status">{getStatusText(table)}</div>
          </div>
        ))}
      </div>

      <div className="legend">
        <h4>Легенда:</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Доступен</span>
          </div>
          <div className="legend-item">
            <div className="legend-color booked"></div>
            <span>Забронирован</span>
          </div>
          <div className="legend-item">
            <div className="legend-color too-small"></div>
            <span>Мал для вашей компании</span>
          </div>
          <div className="legend-item">
            <div className="legend-color inactive"></div>
            <span>Неактивен</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Выбран</span>
          </div>
        </div>
      </div>

      {selectedTable && (
        <div className="selected-table-info">
          <h4>Выбранный стол</h4>
          <div className="table-details">
            <p><strong>Номер:</strong> {selectedTable.number}</p>
            <p><strong>Вместимость:</strong> {selectedTable.capacity} мест</p>
            <p><strong>Этаж:</strong> {selectedTable.floor}</p>
            <p><strong>Секция:</strong> {selectedTable.section || 'Не указана'}</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default TableBooking;
