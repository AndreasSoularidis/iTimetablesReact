import axios from "axios";
import type { Course, TeachingEntity, TeachingPost, TeachingsGet } from "../types";
import { toast } from "react-toastify";
import { useTeachings } from "../hooks/useTeaching";

const SCHOOL_ID = "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b";

async function getTeachings(schoolId: string): Promise<Array<TeachingEntity>> {
  try {
    const response = await axios.get<Array<TeachingsGet>>(
      `http://localhost:5191/api/schools/${schoolId}/teachings`
    );
    return useTeachings(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των δεδομένων διδασκαλίας.");
    return [];
  }
}

async function insertTeaching(data: TeachingPost) {
  try {
    await axios.post(`http://localhost:5191/api/schools/${SCHOOL_ID}/teachings`, data);
    toast.success(
      "Τα στοιχεία αποθηκεύτηκαν με επιτυχία!"
    );
  } catch (error) {
    toast.error(
      "Σφάλμα κατά την αποθήκευση των στοιχείων."
    );
    console.error("Error adding/editing teaching:", error);
  }
}

async function getCourses(gradeId?: string): Promise<Array<Course>> {
  try {
    const response = await axios.get(`http://localhost:5191/api/courses?gradeId=${gradeId ?? ""}`);
    return response.data.courses;
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των δεδομένων μαθημάτων.");
    return [];
  }
}


export const TeachingService = {
  load: getTeachings,
  insert: insertTeaching,
  getCourses: getCourses,
};
