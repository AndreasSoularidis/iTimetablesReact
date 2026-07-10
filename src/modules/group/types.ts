export interface GroupGet {
    id: string;
    name: string;
    totalHours: number;
    short: string;
    color: string;
}

export interface GroupEntity {
    key: string;
    name: string;
    totalHours: number;
    short?: string;
    color?: string;
}