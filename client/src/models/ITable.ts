export interface ITable {
    id: number;
    number: number;
    capacity: number;
    x: number;
    y: number;
    width: number;
    height: number;
    shape: 'circle' | 'rectangle' | 'oval';
    isActive: boolean;
    floor: number;
    section?: string;
}

export interface ITableLayout {
    floor: number;
    tables: ITable[];
    backgroundImage?: string;
    width: number;
    height: number;
}
