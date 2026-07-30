import axios from "axios";
import type { TeachingEntity, TeachingsGet } from "../types";
import { toast } from "react-toastify";
import { useTeachings } from "../hooks/useTeaching";

async function getTeachings(schoolId: string): Promise<Array<TeachingEntity>> {
  try {
    const response = await axios.get<Array<TeachingsGet>>(
      `http://localhost:5191/api/schools/${schoolId}/teachings`
    );
    console.log("Fetched teachings data:", response.data);
    return useTeachings(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των δεδομένων διδασκαλίας.");
    return [];
  }
}

export const TeachingService = {
  load: getTeachings,
};
