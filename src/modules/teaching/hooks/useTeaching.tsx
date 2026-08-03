import type { TeachingsGet, TeachingEntity } from "../types";

export function useTeachings(requestData: any): TeachingEntity[] {
  console.log("useTeachings called with requestData:", requestData.data);
  return requestData.data
    .map((teaching: TeachingsGet, index: number) => ({
      key: `teaching-${index}`,
      schoolClassId: teaching.schoolClass.id,
      name: teaching.schoolClass.name,
      grade: teaching.schoolClass.grade,
      teachingHours: teaching.schoolClass.teachingHours,
      assignedTeachingHours: teaching.teachings?.reduce((sum, t) => sum + t.totalHours, 0) || 0,
      teachings: teaching.teachings,
    }))
    .sort((a: TeachingEntity, b: TeachingEntity) =>
      a.name.localeCompare(b.name)
    );
}