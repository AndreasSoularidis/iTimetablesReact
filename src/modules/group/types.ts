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

export interface Courses{
    id: string;
    title: string;
    short: string;
    grade: Grade;
}

export interface Grade{
    id: string;
    description: string;
    hoursPerWeek: number;
}

export interface TeachingPost{
    schoolClassId: string;
    teacherId: string;
    courseId: string;
    totalHours: number;
    dispersion: number[];
}

export interface TeachingEntity{
    key: string;
    teacher: LookUp;
    course: LookUp;
    totalHours: number;
    dispersion: number[];
}