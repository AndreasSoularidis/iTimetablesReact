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
  const [data, setData] = useState<ISchoolGet | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Σχολική Μονάδα",
      children: "3ο Δημοτικό Σχολείο Νίκαιας",
    },
    {
      key: "2",
      label: "Βαθμίδα",
      children: "Δημοτικό",
    },
    {
      key: "3",
      label: "Σχολικό Έτος",
      children: "2025-2026",
    },
    {
      key: "4",
      label: "Ημέρες Διδασκαλίας",
      children: "5",
    },
    {
      key: "5",
      label: "Μέγιστες Ώρες Διδασκαλίας",
      children: "6",
    },
  ];

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
    const response = SchoolService.get("5007643e-04ec-4176-a8fe-0550f5cd7c73");
    response.then((res) => {
      setData(data);
      console.log(res);
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
