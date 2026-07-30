export interface TeachingsGet {
    schoolClass: SchoolClass;
    teachings?: TeachingDetails[];
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
    teachingHours: number;
}

export interface TeachingEntity {
    key: string;
    name: string;
    teachingHours: number;
    assignedTeachingHours: number;
    teachings?: TeachingDetails[];
}