export interface GroupGet {
    id: string;
    name: string;
    totalHours: number;
    short: string;
    color: string;
    schoolUnitId: string;
}

export interface GroupPost {
    name: string;
    totalHours: number;
    short: string;
    color: string;
    schoolUnitId: string;
}

export interface GroupPut {
    id: string;
    name: string;
    totalHours: number;
    short: string;
    color: string;
    schoolUnitId: string;
}

export interface GroupEntity {
    key: string;
    name: string;
    totalHours: number;
    short?: string;
    color?: string;
    schoolUnitId: string;
}