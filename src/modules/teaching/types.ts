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
    grade: LookUp;
    teachingHours: number;
}

export interface TeachingEntity {
    key: string;
    schoolUnitId: string;
    name: string;
    gradeId: string;
    teachingHours: number;
    assignedTeachingHours: number;
    teachings?: TeachingDetails[];
}

export interface TeachingPost{
    teacherId: string;
    courseId: string;
    totalHours: number;
    dispersion: number[];
}

// export interface GroupEntity {
//     key: string;
//     name: string;
//     totalHours: number;
//     short?: string;
//     color?: string;
//     grade: LookUp;
//     schoolUnitId: string;
// }

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

