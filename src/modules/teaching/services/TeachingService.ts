import axiosInstance from "../../../shared/api/axiosInstance";
import type { GradeCourses, TeachingDelete, TeachingDetails, TeachingEntity, ITeachingsCreateRequest, ITeachingsResponse } from "../types";
import { toast } from "react-toastify";
import { useTeachings } from "../hooks/useTeaching";

async function getTeachings(): Promise<Array<TeachingEntity>> {
  try {
    const response = await axiosInstance.get<Array<ITeachingsResponse>>("/schools/teachings");
    return useTeachings(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των δεδομένων διδασκαλίας.");
    return [];
  }
}

async function insertTeaching(data: ITeachingsCreateRequest): Promise<TeachingDetails | undefined> {
  try {
    const response = await axiosInstance.post(`/schools/teachings`, data);
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
  await axiosInstance.delete(`/schools/teachings/${teacherId}/${schoolClassId}/${courseId}`);
  return true;
}

async function getCourses(): Promise<Array<GradeCourses>> {
  try {
    const response = await axiosInstance.get(`/schoolgrades/courses`);
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
