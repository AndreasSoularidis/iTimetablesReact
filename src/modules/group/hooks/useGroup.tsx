import type { ISchoolClassResponse, SchoolClassEntity } from "../types";

export function useGroups(requestData: any): SchoolClassEntity[] {
  console.log("useGroups called with requestData:", requestData.schoolClasses);
  return requestData.schoolClasses.map((group: ISchoolClassResponse) => ({
    key: group.id,
    name: group.name,
    totalHours: group.totalHours,
    assignedHours: group.assignedHours,
    short: group.short,
    color: group.color,
    grade: group.grade,
    schoolUnitId: group.schoolUnitId,
  }));
}

export function useGroup(group: any): SchoolClassEntity {
  return {
    key: group.id,
    name: group.name,
    totalHours: group.totalHours,
    assignedHours: group.assignedHours,
    short: group.short,
    color: group.color,
    grade: group.grade,
    schoolUnitId: group.schoolUnitId,
  };
}