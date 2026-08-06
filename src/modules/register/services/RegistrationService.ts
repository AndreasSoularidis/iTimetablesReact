import axios from "axios";
import { toast } from "react-toastify";
import type { newDirectorAndSchoolUnitPost } from "../types";


async function createDirectorAndSchool(data: newDirectorAndSchoolUnitPost) {
  try {
    await axios.post(`http://localhost:5191/api/users`, data);
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
};
