export interface ISchoolGrade {
  Id: string;
  Description: string;
}

export interface ILookup {
  Id: string;
  Description: string;
}

export interface ISchoolGet {
  Id: string;
  Name: string;
  SchoolYear: string;
  TeachingDays: number;
  MaxHoursPerDay: number;
  MorningZone: boolean;
  AfternoonZone: boolean;
  ExtendedAfternoonZone: boolean;
  Manager: ILookup;
  SchoolGrade: ILookup;
}

export interface ISchoolPost {
  Name: string;
  SchoolYear: string;
  TeachingDays: number;
  MaxHoursPerDay: number;
  MorningZone: boolean;
  AfternoonZone: boolean;
  ExtendedAfternoonZone: boolean;
  ManagerId: string;
  GradeId: string;
}
