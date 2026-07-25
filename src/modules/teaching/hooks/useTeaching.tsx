import type { TeachingsGet, TeachingEntity } from "../types";

export function useTeachings(requestData: any): TeachingEntity[] {
  console.log("useTeachings called with requestData:", requestData.teachings);
  return requestData.teachings
    .map((teaching: TeachingsGet, index: number) => ({
      key: `teaching-${index}`,
      name: teaching.teacher.description,
      course: teaching.course.description,
      schoolClass: teaching.schoolClass.description,
      totalHours: teaching.totalHours,
      dispersion: teaching.dispersion,
    }))
    .sort((a: TeachingEntity, b: TeachingEntity) =>
      a.schoolClass.localeCompare(b.schoolClass)
    );
}