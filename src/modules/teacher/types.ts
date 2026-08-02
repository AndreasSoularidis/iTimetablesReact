export interface TeacherGet {
    id: string;
    firstName: string;
    lastName: string;
    short: string;
    color: string;
    continuousTeachingHours: number;
    mandatoryTeachingHours: number;
    assignedTeachingHours: number;
    availabilities: number[];
    teachings?: Teachings[];
    specialty: string;
    schoolUnitId: string;
}

export interface TeacherPost {
    firstName: string;
    lastName: string;
    short: string;
    mandatoryTeachingHours: number;
    color: string;
    continuousTeachingHours: number;
    availabilities: number[];
    specialtyId: string;
    schoolUnitId: string;
}

export interface TeacherPut {
    id: string;
    firstName: string;
    lastName: string;
    short: string;
    mandatoryTeachingHours: number;
    color: string;
    continuousTeachingHours: number;
    availabilities: number[];
    specialtyId: string;
    schoolUnitId: string;
}

export interface Specialty{
    id: string;
    code: string;
    title: string;
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
    mandatoryTeachingHours: number;
    assignedTeachingHours: number;
    availabilities: number[];
    teachings: Teachings[];
    specialty: string;
    schoolUnitId: string;
}