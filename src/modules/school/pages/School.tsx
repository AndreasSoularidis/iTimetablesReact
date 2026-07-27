import {
  Button,
  Checkbox,
  Descriptions,
  Divider,
  Space,
  type CheckboxOptionType,
  type DescriptionsProps,
} from "antd";
import { useEffect, useState } from "react";
import AddEditSchool from "../components/AddEditSchool";
import type { ISchoolGet, ISchoolPost, ISchoolPut } from "../types";
import { SchoolService } from "../services/SchoolService";

export default function School() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ISchoolGet>();
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);
  const [editingRecord, setEditingRecord] = useState<ISchoolGet | null>(null);

  const handleSubmit = async (school: ISchoolPost) => {
    try{
      if(editingRecord) {
        const schoolToUpdate: ISchoolPut = {
          id: editingRecord.id,
          name: school.name,
          schoolYear: school.schoolYear,
          teachingDays: school.teachingDays,
          maxHoursPerDay: school.maxHoursPerDay,
          morningZone: school.morningZone,
          afternoonZone: school.afternoonZone,
          extendedAfternoonZone: school.extendedAfternoonZone,
          directorId: school.directorId,
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

  const handleEdit = (record: ISchoolGet) => {
    setIsModalOpen(true);
    setEditingRecord(record);
  };

  const zoneOptions: CheckboxOptionType<string>[] = [
    { label: "Πρωινή Ζώνη", value: "morningZone", className: "label-2" },
    { label: "Ολοήμερο", value: "afternoonZone", className: "label-3" },
    { label: "Διευριμένο Ολοήμερο", value: "extendedAfternoonZone", className: "label-4" },
  ];

  useEffect(() => {
    const response = SchoolService.get("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
    response.then((res) => {
      if (!res) return;
      setData(res);
      setItems([
        { key: "1", label: "Σχολική Μονάδα", children: res.name },
        { key: "2", label: "Βαθμίδα", children: res.schoolType?.description ?? "" },
        { key: "3", label: "Σχολικό Έτος", children: res.schoolYear ?? "" },
        { key: "4", label: "Ημέρες Διδασκαλίας", children: res.teachingDays },
        { key: "5", label: "Μέγιστες Ώρες Διδασκαλίας", children: res.maxHoursPerDay },
      ]);
    });
  }, [editingRecord]);

  return (
    <>
      <h2>Στοιχεία Σχολικής Μονάδας</h2>
      <Divider orientation="start" orientationMargin={0}></Divider>
      <Space>
        <Button
          type="primary"
          // icon={<PlusOutlined />}
          onClick={() => handleEdit(data!)}
        >
          Επεξεργασία
        </Button>
      </Space>
      <Descriptions layout="vertical" items={items} />
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
