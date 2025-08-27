import {
  Button,
  Checkbox,
  Descriptions,
  Divider,
  Space,
  Tooltip,
  type CheckboxOptionType,
  type DescriptionsProps,
} from "antd";

export default function School() {
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

  const optionsWithDisabled: CheckboxOptionType<string>[] = [
    { label: "Πρωινή Ζώνη", value: "morning", className: "label-2" },
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
          // onClick={modifyShowAddModal}
        >
          Επεξεργασία
        </Button>
      </Space>
      <Descriptions layout="vertical" items={items} />
      <br />
      <Checkbox.Group
        options={optionsWithDisabled}
        disabled
        defaultValue={["morning", "afternoonZone"]}
      />
    </>
  );
}
