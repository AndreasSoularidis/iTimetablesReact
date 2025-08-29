import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  type CheckboxOptionType,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import type { ISchoolPost } from "../types";
import { SchoolService } from "../services/SchoolService";
interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  zoneOptions: CheckboxOptionType<string>[];
}
export default function AddEditSchool({
  isModalOpen,
  modifyIsModalOpen,
  zoneOptions,
}: IProps) {
  const [schoolgrades, setSchoolGrades] = useState<
    { id: string; description: string }[]
  >([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchSchoolGrades = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7065/api/schoolgrades/"
        );
        const fetchedSchoolGrades = response.data.schoolGrades;
        console.log(fetchedSchoolGrades);
        setSchoolGrades(fetchedSchoolGrades);
      } catch (error) {
        console.error("Error fetching school grades:", error);
      }
    };
    fetchSchoolGrades();
  }, []);

  const handleOk = async () => {
    try {
      const values = form.getFieldsValue();

      const dataToSubmit: ISchoolPost = {
        Name: values.SchoolUnit,
        SchoolYear: values.SchoolYear,
        TeachingDays: values.TeachingDays,
        MaxHoursPerDay: values.TeachingHours,
        MorningZone: values.AvailableZones?.includes("morningZone") || false,
        AfternoonZone:
          values.AvailableZones?.includes("afternoonZone") || false,
        ExtendedAfternoonZone:
          values.AvailableZones?.includes("extendedAfternoonZone") || false,
        ManagerId: "5007643e-04ec-4176-a8fe-0550f5cd7c73",
        GradeId: values.SchoolGrade,
      };
      console.log("Data to submit", dataToSubmit);
      await SchoolService.insert(dataToSubmit);
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

        <Form.Item label="Βαθμίδα Εκπαίδευσης" name="SchoolGrade">
          <Select
            options={schoolgrades.map((grade) => ({
              label: grade.description,
              value: grade.id,
            }))}
            placeholder="Επιλέξτε βαθμίδα"
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
