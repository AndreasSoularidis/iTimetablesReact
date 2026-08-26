import axiosInstance from "../../../shared/api/axiosInstance";
import type { TimetableEntity, ITimetableResponse } from "../types";
import { toast } from "react-toastify";
import { useTimetables } from "../hooks/useTimetable";

async function getTimetables(): Promise<Array<TimetableEntity>> {
  try {
    const response = await axiosInstance.get<Array<ITimetableResponse>>("/schools/timetables");

    return useTimetables(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των δεδομένων διδασκαλίας.");
    return [];
  }
}

async function createTimetable(): Promise<{id:string, status:number} | undefined> {
  try {
    const response = await axiosInstance.post("/schools/timetables", {});
    toast.success(
      "Η δημιουργία του ωρολογίου προγράμματος βρίσκεται σε εξέλιξη!"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      (error as any)?.response?.data || "Σφάλμα κατά την δημιουργία του ωρολογίου προγράμματος."
    );
    console.error("Error adding/editing teaching:", error);
  }
}

async function exportToExcel(): Promise<void> {
  try {
    const response = await axiosInstance.post(
      `/schools/timetables/export`,
      {},
      {responseType: 'blob'}
    );
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timetable.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success(
      "Η εξαγωγή του ωρολογίου προγράμματος πραγματοποιήθηκε με επιτυχία!"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      (error as any)?.response?.data || "Σφάλμα κατά την εξαγωγή του ωρολογίου προγράμματος."
    );
    console.error("Error exporting timetable to Excel:", error);
  }
}

export const TimetableService = {
  load: getTimetables,
  create: createTimetable,
  export: exportToExcel,
};
