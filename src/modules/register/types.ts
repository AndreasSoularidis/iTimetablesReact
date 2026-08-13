export interface DirectorEntity {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface SchoolUnitEntity {
  name: string;
  schoolYear: string;
  teachingDays: string;
  maxHoursPerDay: string;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  schoolType: LookUp;
}

export interface SchoolUnitPost {
  name: string;
  schoolYear: string;
  teachingDays: string;
  maxHoursPerDay: string;
  morningZone: boolean;
  afternoonZone: boolean;
  extendedAfternoonZone: boolean;
  schoolTypeId: string;
}

export interface newDirectorAndSchoolUnitPost {
  director: DirectorEntity;
  schoolUnit: SchoolUnitPost;
}

export interface LookUp {
  id: string;
  description: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}