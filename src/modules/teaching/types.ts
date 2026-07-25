export interface TeachingsGet {
    teacher: LookUp;
    course: LookUp;
    schoolClass: LookUp;
    totalHours: number;
    dispersion: number[];
}

export interface LookUp{
    id: string;
    description: string;
}

export interface TeachingEntity {
    key: string;
    name: string;
    course: string;
    schoolClass: string;
    totalHours: number;
    dispersion: number[];
}