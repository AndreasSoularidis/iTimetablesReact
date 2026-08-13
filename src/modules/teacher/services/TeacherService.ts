import axiosInstance from "../../../shared/api/axiosInstance";
import type { TeacherEntity, TeacherGet, TeacherPost, TeacherPut } from "../types";
import { toast } from "react-toastify";
import { useTeachers } from "../hooks/useTeacher";

async function getTeachers(): Promise<Array<TeacherEntity>> {
  try {
    const response = await axiosInstance.get<Array<TeacherGet>>("/schools/teachers");

    return useTeachers(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων των εκπαιδευτικών.");
    return [];
  }
}

async function insertTeacher(data: TeacherPost) {
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

async function updateTeacher(teacher: TeacherPut){
  try{
    await axiosInstance.put(`/schools/teachers`, teacher);
    toast.success("Τα στοιχεία του εκπαιδευτικού ενημερώθηκαν με επιτυχία!");
  }catch(error){
    console.error("Error updating teacher:", error);
    toast.error("Σφάλμα κατά την ενημέρωση των στοιχείων του εκπαιδευτικού.");
  }
}

async function deleteTeacher(teacher: TeacherEntity) {
  try {
    const teacherId: string | undefined = teacher.key
    if (teacherId === undefined) {
      return;
    }
    await axiosInstance.delete(`/schools/teachers/${teacherId}`);
    toast.success("Ο εκπαιδευτικός διαγράφηκε με επιτυχία!");
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά τη διαγραφή του εκπαιδευτικού.");
  }
}

export const TeacherService = {
  load: getTeachers,
  insert: insertTeacher,
  update: updateTeacher,
  delete: deleteTeacher,
};
