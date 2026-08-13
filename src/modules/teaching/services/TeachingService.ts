import axiosInstance from "../../../shared/api/axiosInstance";
import type { GradeCourses, TeachingDelete, TeachingDetails, TeachingEntity, TeachingPost, TeachingsGet } from "../types";
import { toast } from "react-toastify";
import { useTeachings } from "../hooks/useTeaching";

const SCHOOL_ID = "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b";

async function getTeachings(schoolId: string): Promise<Array<TeachingEntity>> {
  try {
    const response = await axiosInstance.get<Array<TeachingsGet>>(
      `http://localhost:5191/api/schools/${schoolId}/teachings`
    );
    return useTeachings(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των δεδομένων διδασκαλίας.");
    return [];
  }
}

async function insertTeaching(data: TeachingPost): Promise<TeachingDetails | undefined> {
  try {
    const response = await axiosInstance.post(`http://localhost:5191/api/schools/${SCHOOL_ID}/teachings`, data);
    toast.success(
      "Τα στοιχεία αποθηκεύτηκαν με επιτυχία!"
    );
    return response.data;
  } catch (error) {
    toast.error(
      "Σφάλμα κατά την αποθήκευση των στοιχείων."
    );
    
  }
}

async function deleteTeaching(teacher: TeachingDelete) : Promise<boolean> {
  const { teacherId, schoolClassId, courseId } = teacher;
  if (!schoolClassId || !teacherId || !courseId) {
    return false;
  }
  await axiosInstance.delete(`http://localhost:5191/api/schools/teachings/${teacherId}/${schoolClassId}/${courseId}`);
  return true;
}

async function getCourses(): Promise<Array<GradeCourses>> {
  try {
    const response = await axiosInstance.get(`http://localhost:5191/api/schoolgrades/courses`);
    return response.data;
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
  delete: deleteTeaching,
};
