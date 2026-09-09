import {
  Button,
  Checkbox,
  Descriptions,
  Divider,
  Space,
  type CheckboxOptionType,
  type DescriptionsProps,
} from "antd";
import { EditFilled } from "@ant-design/icons";
import { useTimetableHub } from "../../timetable/hooks/useTimetableHub";
import { useEffect, useState } from "react";
import AddEditSchool from "../components/AddEditSchool";
import type { ISchoolResponse, ISchoolCreateRequest, ISchoolUpdateRequest } from "../types";
import { SchoolService } from "../services/SchoolService";
import { toast } from "react-toastify";

export default function School() {
  const {isProcessing} = useTimetableHub();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ISchoolResponse>();
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);
  const [editingRecord, setEditingRecord] = useState<ISchoolResponse | null>(null);

  const handleSubmit = async (school: ISchoolCreateRequest) => {
    try{
      if(editingRecord) {
        const schoolToUpdate: ISchoolUpdateRequest = {
          id: editingRecord.id,
          name: school.name,
          schoolYear: school.schoolYear,
          teachingDays: school.teachingDays,
          maxHoursPerDay: school.maxHoursPerDay,
          morningZone: school.morningZone,
          afternoonZone: school.afternoonZone,
          extendedAfternoonZone: school.extendedAfternoonZone,
          schoolTypeId: school.schoolTypeId,
        };
        await SchoolService.update(schoolToUpdate);
        setEditingRecord(null); // Clear the editing record after update
      } else{
        await SchoolService.insert(school);
      }
    } catch (error) {
      console.error("Error submitting school:", error);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (record: ISchoolResponse) => {
    if(isProcessing){
      toast.error("Δεν μπορείτε να επεξεργαστείτε τα στοιχεία της σχολικής μονάδας ενώ η δημιουργία του ωρολογίου βρίσκεται σε εξέλιξη.");
      return;
    }
    setIsModalOpen(true);
    setEditingRecord(record);
  };

  const zoneOptions: CheckboxOptionType<string>[] = [
    { label: "Πρωινή Ζώνη", value: "morningZone", className: "label-2" },
    { label: "Ολοήμερο", value: "afternoonZone", className: "label-3" },
    { label: "Διευριμένο Ολοήμερο", value: "extendedAfternoonZone", className: "label-4" },
  ];

  useEffect(() => {
    const response = SchoolService.load();
    response.then((res) => {
      if (!res) return;
      setData(res);
      setItems([
        { key: "1", label: "Σχολική Μονάδα", children: res.name },
        { key: "2", label: "Βαθμίδα", children: res.schoolType?.description ?? "" },
        { key: "3", label: "Σχολικό Έτος", children: res.schoolYear ?? "" },
        { key: "4", label: "Ημέρες Διδασκαλίας", children: res.teachingDays },
        { key: "5", label: "Μέγιστες Ώρες Διδασκαλίας", children: res.maxHoursPerDay },
        { key: "6", label: "Αριθμός Τμημάτων", children: res.numberOfClasses },
        { key: "7", label: "Αριθμός Διδασκόντων", children: res.numberOfTeachers },
        { key: "8", label: "Αριθμός Διδασκαλιών", children: res.numberOfTeachings },
      ]);
    });
  }, [editingRecord]);

  return (
    <>
      <h2>Στοιχεία Σχολικής Μονάδας</h2>
      <Divider orientation="start" orientationMargin={0}></Divider>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          size="large"
          icon={<EditFilled />}
          onClick={() => handleEdit(data!)}
        >
          Επεξεργασία
        </Button>
      </Space>
      <Descriptions layout="horizontal" items={items} />
      <br />
      <Checkbox.Group
        options={zoneOptions}
        disabled
        value={[
          data?.morningZone ? "morningZone" : null,
          data?.afternoonZone ? "afternoonZone" : null,
          data?.extendedAfternoonZone ? "extendedAfternoonZone" : null,
        ].filter(Boolean) as string[]}
      />
      <AddEditSchool
        isModalOpen={isModalOpen}
        modifyIsModalOpen={setIsModalOpen}
        defaultEditValues={editingRecord ?? null}
        zoneOptions={zoneOptions}
        onSubmit={handleSubmit}
      />
    </>
  );
}
