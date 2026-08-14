import type { TimetableEntity, ITimetableResponse } from "../types";

export function useTimetables(requestData: any): TimetableEntity[] {
  console.log("useTimetables called with requestData:", requestData.timetables);
  return requestData.timetables
    .map((teaching: ITimetableResponse, index: number) => ({
      key: `teaching-${index}`,
      feasible: teaching.feasible,
      fitness: teaching.fitness,
      description: teaching.description,
      timeslots: teaching.timeslots,
      school: {
        name: teaching.school.name,
        maxHoursPerDay: teaching.school.maxHoursPerDay,
        teachingDays: teaching.school.teachingDays,
        schoolClasses: teaching.school.schoolClasses,
      }
    }))
}