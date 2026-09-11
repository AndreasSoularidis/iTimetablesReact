export interface ITimetableResponse {
    id: string;
    feasible: boolean;
    fitness: number;
    description: string[];
    timeslots: Teacher[][];
    school: SchoolData;
    createdAt: Date;
}

export interface SchoolData {
    name: string;
    maxHoursPerDay: number;
    teachingDays: number;
    schoolClasses: string[];
}

export interface Teacher{
    id: string;
    firstName: string;
    lastName: string;
    short: string;
    color: string;
}

export interface TimetableEntity {
    key: string;
    feasible: boolean;
    fitness: number;
    description: string[];
    timeslots: Teacher[][];
    school: SchoolData;
    createdAt: Date;
}

export interface ProgressMessage {
    timetableId: string;
    completionPercentage: number;
    status: number;
}