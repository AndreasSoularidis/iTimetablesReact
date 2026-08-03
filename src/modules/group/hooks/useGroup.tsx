import type { GroupGet, GroupEntity } from "../types";

export function useGroups(requestData: any): GroupEntity[] {
  console.log("useGroups called with requestData:", requestData.schoolClasses);
  return requestData.schoolClasses.map((group: GroupGet) => ({
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

export function useGroup(group: any): GroupEntity {
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