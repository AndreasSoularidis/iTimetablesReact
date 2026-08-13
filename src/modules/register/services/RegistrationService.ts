import { toast } from "react-toastify";
import type { LoginRequest, LoginResponse, newDirectorAndSchoolUnitPost } from "../types";
import axiosInstance, { setTokens } from "../../../shared/api/axiosInstance";


async function createDirectorAndSchool(data: newDirectorAndSchoolUnitPost) {
  try {
    await axiosInstance.post(`/users`, data);
    toast.success(
      "Τα στοιχεία του διευθυντή και της σχολικής μονάδας αποθηκεύτηκαν με επιτυχία!"
    );
    console.log("Data submitted", data);
  } catch (error) {
    toast.error(
      "Σφάλμα κατά την αποθήκευση των στοιχείων του διευθυντή και της σχολικής μονάδας."
    );
    console.error("Error adding/editing director and school unit:", error);
  }
}

async function login(data: LoginRequest): Promise<LoginResponse | undefined> {
  try {
    const response = await axiosInstance.post<LoginResponse>(`/users/login`, data);
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
    return response.data;
  } catch (error) {
    toast.error("Σφάλμα κατά τη σύνδεση.");
    console.error("Error logging in:", error);
  }
}

// async function updateTeacher(teacher: TeacherPut){
//   try{
//     await axios.put(`http://localhost:5191/api/schools/${teacher.schoolUnitId}/teachers`, teacher);
//     toast.success("Τα στοιχεία του εκπαιδευτικού ενημερώθηκαν με επιτυχία!");
//   }catch(error){
//     console.error("Error updating teacher:", error);
//     toast.error("Σφάλμα κατά την ενημέρωση των στοιχείων του εκπαιδευτικού.");
//   }
// }

// async function deleteTeacher(teacher: TeacherEntity) {
//   try {
//     const teacherId: string | undefined = teacher.key
//     if (teacherId === undefined) {
//       return;
//     }
//     await axios.delete(`http://localhost:5191/api/schools/${teacher.schoolUnitId}/teachers/${teacherId}`);
//     toast.success("Ο εκπαιδευτικός διαγράφηκε με επιτυχία!");
//   } catch (error) {
//     console.error(error);
//     toast.error("Σφάλμα κατά τη διαγραφή του εκπαιδευτικού.");
//   }
// }

export const RegistrationService = {
  insert: createDirectorAndSchool,
  login: login,
};
