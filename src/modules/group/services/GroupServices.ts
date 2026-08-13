import axiosInstance from "../../../shared/api/axiosInstance";
import type { GroupEntity, GroupGet, GroupPost, GroupPut } from "../types";
import { toast } from "react-toastify";
import { useGroup, useGroups } from "../hooks/useGroup";

async function getGroups(schoolId: string): Promise<Array<GroupEntity>> {
  try {
    const response = await axiosInstance.get<Array<GroupGet>>(
      `http://localhost:5191/api/schools/${schoolId}/groups`
    );

    return useGroups(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων των ομάδων.");
    return [];
  }
}

async function insertGroup(data: GroupPost): Promise<GroupEntity | void> {
  try {
    const response = await axiosInstance.post(`http://localhost:5191/api/schools/${data.schoolUnitId}/groups`, data);
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

async function updateGroup(group: GroupPut){
  try{
    await axiosInstance.put(`http://localhost:5191/api/schools/${group.schoolUnitId}/groups/${group.id}`, group);
    toast.success("Τα στοιχεία ενημερώθηκαν με επιτυχία!");
  }catch(error){
    console.error("Error updating group:", error);
    toast.error("Σφάλμα κατά την ενημέρωση των στοιχείων.");
  }
}

async function deleteGroup(group: GroupEntity) {
  try {
    const groupId: string | undefined = group.key
    if (groupId === undefined) {
      return;
    }
    await axiosInstance.delete(`http://localhost:5191/api/schools/${group.schoolUnitId}/groups/${groupId}`);
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