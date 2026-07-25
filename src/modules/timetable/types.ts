export interface TimetablesGet {
    id: string;
    feasible: boolean;
    fitness: number;
    description: string[];
    timeslots: Teacher[][];
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
}