export interface TimetablesGet {
    id: string;
    feasible: boolean;
    fitness: number;
    description: string[];
    timeslots: Teacher[][];
    school: SchoolData;
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
}