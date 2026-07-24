export interface TeacherGet {
    id: string;
    firstName: string;
    lastName: string;
    short: string;
    color: string;
    continuousTeachingHours: number;
    availabilities: number[];
    teachings: Teachings[];
    specialty: string;
}

export interface LookUp{
    id: string;
    description: string;
}

export interface Teachings{
    course: LookUp;
    schoolClass: LookUp;
    totalHours: number;
    dispersion: number[];
}

export interface TeacherEntity {
    key: string;
    name: string;
    short: string;
    color: string;
    continuousTeachingHours: number;
    availabilities: number[];
    teachings: Teachings[];
    specialty: string;
}