import {
  Button,
  Checkbox,
  Descriptions,
  Divider,
  Space,
  type CheckboxOptionType,
  type DescriptionsProps,
} from "antd";
import { useState } from "react";
import AddEditSchool from "../components/AddEditSchool";

export default function School() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
