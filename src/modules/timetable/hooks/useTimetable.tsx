import type { TimetablesGet, TimetableEntity } from "../types";

export function useTimetables(requestData: any): TimetableEntity[] {
  console.log("useTimetables called with requestData:", requestData.timetables);
  return requestData.timetables
    .map((teaching: TimetablesGet, index: number) => ({
      key: `teaching-${index}`,
      feasible: teaching.feasible,
      fitness: teaching.fitness,
      description: teaching.description,
      timeslots: teaching.timeslots,
    }))
}