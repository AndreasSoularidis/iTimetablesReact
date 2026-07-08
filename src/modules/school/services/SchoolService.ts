import axios from "axios";
import type { ISchoolGet, ISchoolPost } from "../types";
import { toast } from "react-toastify";

async function getSchoolData(managerId: string): Promise<ISchoolGet | null> {
  try {
    const response = await axios.get(
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
    await axios.post("http://localhost:5191/api/schools/", data);
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
export const SchoolService = {
  insert: insertSchoolData,
  get: getSchoolData,
};
