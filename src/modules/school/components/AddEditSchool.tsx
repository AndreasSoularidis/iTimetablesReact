import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  type CheckboxOptionType,
} from "antd";
import { useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL } from "../../../shared/api/axiosInstance";
import type { ISchoolCreateRequest, ISchoolResponse } from "../types";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  defaultEditValues: ISchoolResponse | null;
  zoneOptions: CheckboxOptionType<string>[];
  onSubmit: (school: ISchoolCreateRequest) => Promise<void>;
}
export default function AddEditSchool({
  isModalOpen,
  modifyIsModalOpen,
  zoneOptions,
  defaultEditValues,
  onSubmit,
}: IProps) {
  const [schoolTypes, setSchoolTypes] = useState<{ id: string; description: string }[]>([]);
  const [selectedSchoolType, setSelectedSchoolType] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen && defaultEditValues) {
      form.setFieldsValue({
        SchoolUnit: defaultEditValues.name,
        SchoolYear: defaultEditValues.schoolYear,
        TeachingDays: defaultEditValues.teachingDays,
        TeachingHours: defaultEditValues.maxHoursPerDay,
        AvailableZones: [
          defaultEditValues.morningZone ? "morningZone" : null,
          defaultEditValues.afternoonZone ? "afternoonZone" : null,
          defaultEditValues.extendedAfternoonZone ? "extendedAfternoonZone" : null,
        ].filter(Boolean),
        SchoolType: defaultEditValues.schoolType?.description ?? "",
      });
      setSelectedSchoolType(defaultEditValues.schoolType?.id ?? null);
    }
  }, [isModalOpen, defaultEditValues, form]);

  useEffect(() => {
    async function fetchSchoolTypes() {
      try {
        const response = await axios.get(`${BASE_URL}/schoolTypes`);
        setSchoolTypes(response.data.schoolTypes);
      } catch (error) {
        console.error("Error fetching school types:", error);
      }
    }
    fetchSchoolTypes();
  }, []);


  const handleOk = async () => {
    try {
      const values = form.getFieldsValue();
      const dataToSubmit: ISchoolCreateRequest = {
        name: values.SchoolUnit,
        schoolYear: values.SchoolYear,
        teachingDays: values.TeachingDays,
        maxHoursPerDay: values.TeachingHours,
        morningZone: values.AvailableZones?.includes("morningZone") || false,
        afternoonZone:
          values.AvailableZones?.includes("afternoonZone") || false,
        extendedAfternoonZone:
          values.AvailableZones?.includes("extendedAfternoonZone") || false,
        schoolTypeId: selectedSchoolType || "", // Use the selected school type ID
      };
      await onSubmit(dataToSubmit);
      form.resetFields();
    } catch (error) {
      console.error("Error adding/editing school:", error);
    }
    modifyIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    modifyIsModalOpen(false);
  };

  return (
    <Modal
      title="Εισαγωγή Στοιχείων Σχολικής Μονάδας"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 800 }}
      >
        <Form.Item label="Σχολική Μονάδα" name="SchoolUnit">
          <Input />
        </Form.Item>

        <Form.Item label="Βαθμίδα Εκπαίδευσης" name="SchoolType">
          <Select
            options={schoolTypes.map((type) => ({
              key: type.id,
              value: type.id,
              label: type.description,
            }))}
            placeholder="Επιλέξτε βαθμίδα"
            onChange={(value) => {
              form.setFieldsValue({ SchoolType: value });
              setSelectedSchoolType(value);
            }}
          />
        </Form.Item>
        <Form.Item label="Σχολικό Έτος" name="SchoolYear">
          <Input />
        </Form.Item>
        <Form.Item label="Ημέρες Διδασκαλίας" name="TeachingDays">
          <InputNumber min={1} max={7} />
        </Form.Item>
        <Form.Item label="Ώρες Διδασκαλίας" name="TeachingHours">
          <InputNumber min={1} max={45} />
        </Form.Item>
        <Form.Item label="Διαθέσιμες Ζώνες" name="AvailableZones">
          <Checkbox.Group options={zoneOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
