export interface TeachingsGet {
    schoolClass: SchoolClass;
    teachings?: TeachingDetails[];
}

export interface TeachingDelete {
    teacherId: string;
    schoolClassId: string;
    courseId: string;
}

export interface TeachingDetails {
    teacher: LookUp;
    course: LookUp;
    totalHours: number;
    dispersion: number[];
}

export interface LookUp {
    id: string;
    description: string;
}

export interface SchoolClass {
    id: string;
    name: string;
    grade: LookUp;
    teachingHours: number;
}

export interface TeachingEntity {
    key: string;
    schoolClassId: string;
    name: string;
    grade: LookUp;
    teachingHours: number;
    assignedTeachingHours: number;
    teachings?: TeachingDetails[];
}

export interface Teaching {
    key: string;
    schoolClass: LookUp;
    course: LookUp;
    teacher: LookUp;
    totalHours: number;
    dispersion: number[];
}

export interface TeachingPost{
    schoolClassId: string;
    teacherId: string;
    courseId: string;
    totalHours: number;
    dispersion: number[];
}

export interface SchoolClassEntity {
    id: string;
    name: string;
    totalHours: number;
    short: string;
    grade: LookUp;
    schoolUnitId: string;
}

export interface Course{
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

