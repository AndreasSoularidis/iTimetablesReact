import axios from "axios";
import type { TimetableEntity, TimetablesGet } from "../types";
import { toast } from "react-toastify";
import { useTimetables } from "../hooks/useTimetable";


async function getTimetables(schoolId: string): Promise<Array<TimetableEntity>> {
  try {
    const response = await axios.get<Array<TimetablesGet>>(
      `http://localhost:5191/api/schools/${schoolId}/timetables`
    );

    return useTimetables(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των δεδομένων διδασκαλίας.");
    return [];
  }
}

import type { TimetablePost } from "../types";

async function createTimetable(data: TimetablePost): Promise<string | undefined> {
  try {
    const response = await axios.post(`http://localhost:5191/api/schools/timetables`, data);
    toast.success(
      "Η δημιουργία του ωρολογίου προγράμματος βρίσκεται σε εξέλιξη!"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      (error as any)?.response?.data || "Σφάλμα κατά την δημιουργία του ωρολογίου προγράμματος."
    );
    console.error("Error adding/editing teaching:", error);
  }
}

export const TimetableService = {
  load: getTimetables,
  create: createTimetable,
};
