import axiosInstance from "../../../shared/api/axiosInstance";
import type { ISchoolGet, ISchoolPost, ISchoolPut } from "../types";
import { toast } from "react-toastify";

async function getSchoolData(managerId: string): Promise<ISchoolGet | null> {
  try {
    const response = await axiosInstance.get(
      `http://localhost:5191/api/schools/${managerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching school grades:", error);
    return null;
  }
}

async function insertSchoolData(data: ISchoolPost) {
  try {
    await axiosInstance.post("http://localhost:5191/api/schools/", data);
    toast.success(
      "Τα στοιχεία της σχολικής μονάδας αποθηκεύτηκαν με επιτυχία!"
    );
    console.log("Data submitted", data);
  } catch (error) {
    toast.error(
      "Σφάλμα κατά την αποθήκευση των στοιχείων της σχολικής μονάδας."
    );
    console.error("Error adding/editing school:", error);
  }
}

async function updateSchoolUnit(schoolUnit: ISchoolPut){
  try{
    await axiosInstance.put(`http://localhost:5191/api/schools/${schoolUnit.id}`, schoolUnit);
    toast.success("Τα στοιχεία της σχολικής μονάδας ενημερώθηκαν με επιτυχία!");
  }catch(error){
    console.error("Error updating school unit:", error);
    toast.error("Σφάλμα κατά την ενημέρωση των στοιχείων της σχολικής μονάδας.");
  }
}

export const SchoolService = {
  insert: insertSchoolData,
  get: getSchoolData,
  update: updateSchoolUnit,
};
