import type { TeacherGet, TeacherEntity } from "../types";

export function useTeachers(requestData: any): TeacherEntity[] {
  console.log("useTeachers called with requestData:", requestData.teachers);
  return requestData.teachers.map((teacher: TeacherGet) => ({
    key: teacher.id,
    name: `${teacher.firstName} ${teacher.lastName}`,
    short: teacher.short,
    color: teacher.color,
    continuousTeachingHours: teacher.continuousTeachingHours,
    mandatoryTeachingHours: teacher.mandatoryTeachingHours,
    availabilities: teacher.availabilities,
    teachings: teacher.teachings ?? [],
    specialty: teacher.specialty,
    schoolUnitId: teacher.schoolUnitId,
  }));
}