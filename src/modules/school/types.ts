export interface ISchoolGrade {
  Id: string;
  Description: string;
}

export interface ILookup {
  id: string;
  description: string;
}

export interface IDirector {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export interface ISchoolResponse {
  id: string;
  name: string;
  schoolYear: string;
  teachingDays: number;
  maxHoursPerDay: number;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  numberOfClasses: number;
  numberOfTeachers: number;
  numberOfTeachings: number;
  schoolType: ILookup;
}

export interface ISchoolCreateRequest {
  name: string;
  schoolYear: string;
  teachingDays: number;
  maxHoursPerDay: number;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  schoolTypeId: string;
}

export interface ISchoolUpdateRequest {
  id: string;
  name: string;
  schoolYear: string;
  teachingDays: number;
  maxHoursPerDay: number;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  schoolTypeId: string;
}