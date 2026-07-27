import axios from "axios";
import type { TeacherEntity, TeacherGet, TeacherPost } from "../types";
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

async function insertTeacher(data: TeacherPost) {
  try {
    await axios.post(`http://localhost:5191/api/schools/${data.schoolUnitId}/teachers`, data);
    toast.success(
      "Τα στοιχεία του εκπαιδευτικού αποθηκεύτηκαν με επιτυχία!"
    );
    console.log("Data submitted", data);
  } catch (error) {
    toast.error(
      "Σφάλμα κατά την αποθήκευση των στοιχείων του εκπαιδευτικού."
    );
    console.error("Error adding/editing teacher:", error);
  }
}

export const TeacherService = {
  load: getTeachers,
  insert: insertTeacher,
};
