import axiosInstance from "../../../shared/api/axiosInstance";
import type { SchoolClassEntity, ISchoolClassResponse, ISchoolClassCreateRequest, ISchoolClassUpdateRequest } from "../types";
import { toast } from "react-toastify";
import { useGroup, useGroups } from "../hooks/useGroup";

async function getGroups(): Promise<Array<SchoolClassEntity>> {
  try {
    const response = await axiosInstance.get<Array<ISchoolClassResponse>>("/schools/classes");

    return useGroups(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων των ομάδων.");
    return [];
  }
}

async function insertGroup(data: ISchoolClassCreateRequest): Promise<SchoolClassEntity | void> {
  try {
    const response = await axiosInstance.post("/schools/classes", data);
    toast.success(
      "Τα στοιχεία αποθηκεύτηκαν με επιτυχία!"
    );
    return useGroup(response.data);
  } catch (error) {
    toast.error(
      "Σφάλμα κατά την αποθήκευση των στοιχείων."
    );
    console.error("Error adding/editing group:", error);
  }
}

async function updateGroup(schoolClass: ISchoolClassUpdateRequest){
  try{
    await axiosInstance.put(`/schools/classes/${schoolClass.id}`, schoolClass);
    toast.success("Τα στοιχεία ενημερώθηκαν με επιτυχία!");
  }catch(error){
    console.error("Error updating group:", error);
    toast.error("Σφάλμα κατά την ενημέρωση των στοιχείων.");
  }
}

async function deleteGroup(group: SchoolClassEntity) {
  try {
    const groupId: string | undefined = group.key
    if (groupId === undefined) {
      return;
    }
    await axiosInstance.delete(`/schools/classes/${groupId}`);
    toast.success("Το τμήμα διαγράφηκε με επιτυχία!");
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά τη διαγραφή του τμήματος.");
  }
}

export const GroupService = {
  load: getGroups,
  insert: insertGroup,
  update: updateGroup,
  delete: deleteGroup,
};