import { makeAutoObservable } from 'mobx';
import { ITable } from '../models/ITable';
import { mockTables } from '../data/mockData';

export class TableStore {
  tables: ITable[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
    this.loadMockData();
  }

  loadMockData() {
    this.tables = [...mockTables];
  }

  async fetchTables(floor?: number, active?: boolean) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredTables = [...mockTables];
      
      if (floor !== undefined) {
        filteredTables = filteredTables.filter(table => table.floor === floor);
      }
      
      if (active !== undefined) {
        filteredTables = filteredTables.filter(table => table.isActive === active);
      }
      
      this.tables = filteredTables;
      this.isLoading = false;
      
      return filteredTables;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async createTable(tableData: Omit<ITable, 'id'>) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newTable: ITable = {
        id: Math.max(...this.tables.map(item => item.id)) + 1,
        ...tableData
      };
      
      this.tables.push(newTable);
      this.isLoading = false;
      
      return newTable;
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async updateTable(id: number, tableData: Partial<ITable>) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = this.tables.findIndex(table => table.id === id);
      if (index !== -1) {
        this.tables[index] = {
          ...this.tables[index],
          ...tableData
        };
      }
      this.isLoading = false;
      
      return this.tables[index];
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async deleteTable(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.tables = this.tables.filter(table => table.id !== id);
      this.isLoading = false;
      
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  async toggleTableStatus(id: number) {
    try {
      this.isLoading = true;
      this.error = '';
      
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = this.tables.findIndex(table => table.id === id);
      if (index !== -1) {
        this.tables[index] = {
          ...this.tables[index],
          isActive: !this.tables[index].isActive
        };
      }
      this.isLoading = false;
      
      return this.tables[index];
    } catch (e: any) {
      const errorMessage = e.message || "An unknown error occurred";
      this.error = errorMessage;
      this.isLoading = false;
      throw new Error(errorMessage);
    }
  }

  getTablesByFloor(floor: number): ITable[] {
    return this.tables.filter(table => table.floor === floor);
  }

  getActiveTables(): ITable[] {
    return this.tables.filter(table => table.isActive);
  }

  getTableByNumber(number: number): ITable | undefined {
    return this.tables.find(table => table.number === number);
  }

  clearError() {
    this.error = '';
  }
}
