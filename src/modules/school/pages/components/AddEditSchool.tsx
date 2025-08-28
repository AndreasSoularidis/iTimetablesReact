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

  const handleOk = () => {
    modifyIsModalOpen(false);
  };

  const handleCancel = () => {
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 800 }}
      >
        <Form.Item label="Σχολική Μονάδα">
          <Input />
        </Form.Item>

        <Form.Item label="Βαθμίδα Εκπαίδευσης">
          <Select
            options={schoolgrades.map((grade) => ({
              label: grade.description,
              value: grade.id,
            }))}
            placeholder="Επιλέξτε βαθμίδα"
          />
        </Form.Item>
        <Form.Item label="Σχολικό Έτος">
          <Input />
        </Form.Item>
        <Form.Item label="Ημέρες Διδασκαλίας">
          <InputNumber min={1} max={7} />
        </Form.Item>
        <Form.Item label="Ώρες Διδασκαλίας">
          <InputNumber min={1} max={45} />
        </Form.Item>
        <Form.Item label="Διαθέσιμες Ζώνες">
          <Checkbox.Group options={zoneOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
