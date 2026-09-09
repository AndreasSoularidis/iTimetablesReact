import { toast } from "react-toastify";
import axiosInstance from "../../../shared/api/axiosInstance";
import type { DirectorResponse, DirectorUpdateRequest } from "../types";
  

async function getDirector(): Promise<DirectorResponse | null> {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων.");
    return null;
  }
}

async function updateDirector(director: DirectorUpdateRequest): Promise<void> {
  try{
    await axiosInstance.put(`/users/${director.id}`, director);
    toast.success("Τα στοιχεία του διευθυντή ενημε����θηκαν με επιτυχία!");
  }catch(error){
    console.error("Error updating director:", error);
    toast.error("Σφάλμα κατά την ενημέ��ωση των στοιχείων του διευθυντή.");
  }
}

async function deleteDirector(directorId: string): Promise<boolean> {
  try {
    if (directorId === undefined) return false;

    await axiosInstance.delete(`/users/${directorId}`);
    toast.success("Το προφίλ διαγράφηκε με επιτυχία!");
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά τη διαγραφή του προφίλ.");
    return false;
  }
}

export const ProfileService = {
  load: getDirector,
  update: updateDirector,
  delete: deleteDirector,
};