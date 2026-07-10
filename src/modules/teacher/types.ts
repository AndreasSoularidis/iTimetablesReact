export interface TeacherGet {
    id: string;
    firstName: string;
    lastName: string;
    short: string;
    color: string;
    continuousTeachingHours: number;
    availabilities: number[];
    specialty: string;
}

export interface TeacherEntity {
    key: string;
    name: string;
    short: string;
    color: string;
    continuousTeachingHours: number;
    availabilities: number[];
    specialty: string;
}