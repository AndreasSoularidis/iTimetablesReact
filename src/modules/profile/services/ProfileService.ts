import { toast } from "react-toastify";
import axiosInstance from "../../../shared/api/axiosInstance";
import type { DirectorResponse } from "../types";
  

async function getDirector(): Promise<DirectorResponse | null> {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων.");
    return null;
  }
}

export const ProfileService = {
  load: getDirector,
};