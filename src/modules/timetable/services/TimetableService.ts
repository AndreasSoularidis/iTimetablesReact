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

export const TimetableService = {
  load: getTimetables,
};
