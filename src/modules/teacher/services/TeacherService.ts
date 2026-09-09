import axiosInstance from "../../../shared/api/axiosInstance";
import type { TeacherEntity, ITeacherResponse, ITeacherCreateRequest, ITeacherUpdateRequest } from "../types";
import { toast } from "react-toastify";
import { useTeachers } from "../hooks/useTeacher";

async function getTeachers(): Promise<Array<TeacherEntity>> {
  try {
    const response = await axiosInstance.get<Array<ITeacherResponse>>("/schools/teachers");

    return useTeachers(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων των εκπαιδευτικών.");
    return [];
  }
}

async function insertTeacher(data: ITeacherCreateRequest) {
  try {
    await axiosInstance.post("/schools/teachers", data);
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

async function updateTeacher(teacher: ITeacherUpdateRequest){
  try{
    await axiosInstance.put(`/schools/teachers/${teacher.id}`, teacher);
    toast.success("Τα στοιχεία του εκπαιδευτικού ενημερώθηκαν με επιτυχία!");
  }catch(error){
    console.error("Error updating teacher:", error);
    toast.error("Σφάλμα κατά την ενημέρωση των στοιχείων του εκπαιδευτικού.");
  }
}

async function deleteTeacher(teacher: TeacherEntity) : Promise<boolean> {
  try {
    const teacherId: string | undefined = teacher.key
    if (teacherId === undefined) {
      return false;
    }
    await axiosInstance.delete(`/schools/teachers/${teacherId}`);
    toast.success("Ο εκπαιδευτικός διαγράφηκε με επιτυχία!");
    return true;
  } catch (error) {
    return false;
  }
}

async function deleteAllTeachers() : Promise<boolean> {
  try {
    await axiosInstance.delete(`/schools/teachers/all`);
    toast.success("Οι εκπαιδευτικοί διαγράφηκαν με επιτυχία!");
    return true;
  } catch (error) {
    toast.error("Σφάλμα κατά τη διαγραφή των εκπαιδευτικών.");
    return false;
  }
}

export const TeacherService = {
  load: getTeachers,
  insert: insertTeacher,
  update: updateTeacher,
  delete: deleteTeacher,
  deleteAll: deleteAllTeachers,
};
