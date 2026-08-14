export interface ISchoolClassResponse {
    id: string;
    name: string;
    totalHours: number;
    assignedHours: number;
    short: string;
    color: string;
    grade: LookUp;
    schoolUnitId: string;
}

export interface LookUp {
    id: string;
    description: string;
}

export interface ISchoolClassCreateRequest {
    name: string;
    totalHours: number;
    short: string;
    color: string;
    gradeId: string;
    schoolUnitId: string;
}

export interface ISchoolClassUpdateRequest {
    id: string;
    name: string;
    totalHours: number;
    assignedHours: number;
    short: string;
    color: string;
    gradeId: string;
    schoolUnitId: string;
}

export interface SchoolClassEntity {
    key: string;
    name: string;
    totalHours: number;
    assignedHours: number;
    short?: string;
    color?: string;
    grade: LookUp;
    schoolUnitId: string;
}

