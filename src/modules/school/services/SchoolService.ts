import axiosInstance from "../../../shared/api/axiosInstance";
import type { ISchoolResponse, ISchoolCreateRequest, ISchoolUpdateRequest } from "../types";
import { toast } from "react-toastify";

async function getSchoolData(): Promise<ISchoolResponse | null> {
  try {
    const response = await axiosInstance.get("/schools");
    return response.data;
  } catch (error) {
    console.error("Error fetching school grades:", error);
    return null;
  }
}

async function insertSchoolData(data: ISchoolCreateRequest) {
  try {
    await axiosInstance.post("/schools", data);
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

async function updateSchoolUnit(schoolUnit: ISchoolUpdateRequest){
  try{
    await axiosInstance.put(`/schools/${schoolUnit.id}`, schoolUnit);
    toast.success("Τα στοιχεία της σχολικής μονάδας ενημερώθηκαν με επιτυχία!");
  }catch(error){
    console.error("Error updating school unit:", error);
    toast.error("Σφάλμα κατά την ενημέρωση των στοιχείων της σχολικής μονάδας.");
  }
}

export const SchoolService = {
  insert: insertSchoolData,
  load: getSchoolData,
  update: updateSchoolUnit,
};
