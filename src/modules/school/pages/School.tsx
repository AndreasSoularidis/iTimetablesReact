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
import type { ISchoolGet } from "../types";
import { SchoolService } from "../services/SchoolService";

export default function School() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ISchoolGet>();
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const items: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "Σχολική Μονάδα",
  //     children: "3ο Δημοτικό Σχολείο Νίκαιας",
  //   },
  //   {
  //     key: "2",
  //     label: "Βαθμίδα",
  //     children: "Δημοτικό",
  //   },
  //   {
  //     key: "3",
  //     label: "Σχολικό Έτος",
  //     children: "2025-2026",
  //   },
  //   {
  //     key: "4",
  //     label: "Ημέρες Διδασκαλίας",
  //     children: "5",
  //   },
  //   {
  //     key: "5",
  //     label: "Μέγιστες Ώρες Διδασκαλίας",
  //     children: "6",
  //   },
  // ];

  const zoneOptions: CheckboxOptionType<string>[] = [
    { label: "Πρωινή Ζώνη", value: "morningZone", className: "label-2" },
    { label: "Ολοήμερο", value: "afternoonZone", className: "label-3" },
    {
      label: "Διευριμένο Ολοήμερο",
      value: "extendedAfternoonZone",
      className: "label-4",
    },
  ];

  useEffect(() => {
    const response = SchoolService.get("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
    response.then((res) => {
      if (!res) return;
      setData(res);
      console.log(res);
      setItems([
        { key: "1", label: "Σχολική Μονάδα", children: res.name },
        { key: "2", label: "Βαθμίδα", children: res.schoolGrade?.description ?? "" },
        { key: "3", label: "Σχολικό Έτος", children: res.schoolYear ?? "" },
        { key: "4", label: "Ημέρες Διδασκαλίας", children: res.teachingDays },
        { key: "5", label: "Μέγιστες Ώρες Διδασκαλίας", children: res.maxHoursPerDay },
      ]);
    });
  }, []);

  return (
    <>
      <h2>Στοιχεία Σχολικής Μονάδας</h2>
      <Divider orientation="start" orientationMargin={0}></Divider>
      <Space>
        <Button
          type="primary"
          // icon={<PlusOutlined />}
          onClick={showModal}
        >
          Επεξεργασία
        </Button>
      </Space>
      <Descriptions layout="vertical" items={items} />
      <br />
      <Checkbox.Group
        options={zoneOptions}
        disabled
        defaultValue={["morningZone", "afternoonZone"]}
      />
      <AddEditSchool
        isModalOpen={isModalOpen}
        modifyIsModalOpen={setIsModalOpen}
        zoneOptions={zoneOptions}
      />
    </>
  );
}
