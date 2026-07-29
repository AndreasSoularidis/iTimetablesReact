export interface GroupGet {
    id: string;
    name: string;
    totalHours: number;
    short: string;
    color: string;
    grade: LookUp;
    schoolUnitId: string;
}

export interface LookUp {
    id: string;
    description: string;
}

export interface GroupPost {
    name: string;
    totalHours: number;
    short: string;
    color: string;
    gradeId: string;
    schoolUnitId: string;
}

export interface GroupPut {
    id: string;
    name: string;
    totalHours: number;
    short: string;
    color: string;
    gradeId: string;
    schoolUnitId: string;
}

export interface GroupEntity {
    key: string;
    name: string;
    totalHours: number;
    short?: string;
    color?: string;
    grade: LookUp;
    schoolUnitId: string;
}