import axios from "axios";
import type { GroupEntity, GroupGet } from "../types";
import { toast } from "react-toastify";
import { useGroups } from "../hooks/useGroup";

async function getGroups(schoolId: string): Promise<Array<GroupEntity>> {
  try {
    const response = await axios.get<Array<GroupGet>>(
      `http://localhost:5191/api/schools/${schoolId}/groups`
    );

    return useGroups(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Σφάλμα κατά την ανάκτηση των στοιχείων των ομάδων.");
    return [];
  }
}

export const GroupService = {
  load: getGroups,
};