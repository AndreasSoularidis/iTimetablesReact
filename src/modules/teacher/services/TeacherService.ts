import axios from "axios";
import type { TeacherEntity, TeacherGet } from "../types";
import { toast } from "react-toastify";
import { useTeachers } from "../hooks/useTeacher";

async function getTeachers(schoolId: string): Promise<Array<TeacherEntity>> {
  try {
    const response = await axios.get<Array<TeacherGet>>(
      `http://localhost:5191/api/schools/${schoolId}/teachers`
    );

    return useTeachers(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων των εκπαιδευτικών.");
    return [];
  }
}

export const TeacherService = {
  load: getTeachers,
};
