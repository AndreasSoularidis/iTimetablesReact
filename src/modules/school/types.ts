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

export interface ISchoolGet {
  id: string;
  name: string;
  schoolYear: string;
  teachingDays: number;
  maxHoursPerDay: number;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  director: IDirector;
  schoolType: ILookup;
}

export interface ISchoolPost {
  name: string;
  schoolYear: string;
  teachingDays: number;
  maxHoursPerDay: number;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  directorId: string;
  schoolTypeId: string;
}

export interface ISchoolPut {
  id: string;
  name: string;
  schoolYear: string;
  teachingDays: number;
  maxHoursPerDay: number;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  directorId: string;
  schoolTypeId: string;
}