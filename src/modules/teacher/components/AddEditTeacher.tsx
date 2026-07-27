import {
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Slider,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import AvailabilityTable from "../../../shared/AvailabilityTable/AvailabilityTable";
import type { TeacherPost } from "../types";

const initialAvailability: number[][] = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]    

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  // defaultEditValues: TeacherGet | null;
  onSubmit: (teacher: TeacherPost) => Promise<void>;
}

export default function AddEditTeacher({
  isModalOpen,
  modifyIsModalOpen,
  // defaultEditValues,
  onSubmit,
}: IProps) {
  const [specialties, setSpecialties] = useState<{ id: string; code: string; title: string }[]>([]);
  const [availabilities, setAvailabilities] = useState<number[][]>(() =>
    initialAvailability.map(row => [...row])
  );

  const [form] = Form.useForm();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  function handleSelectSquare(rowIndex: number, colIndex: number) {

    setAvailabilities((prevAvailabilities) => {
        const updatedAvailabilities = prevAvailabilities.map(row => [...row]);
        updatedAvailabilities[rowIndex][colIndex] = (updatedAvailabilities[rowIndex][colIndex] + 1) % 5;
        return updatedAvailabilities;
    });
  }

  const handleOk = async () => {
      form.validateFields()
      .then(async (values) => {
        const dataToSubmit: TeacherPost = {
          firstName: values.firstName,
          lastName: values.lastName,
          short: `${values.firstName.charAt(0)}${values.lastName.charAt(0)}`,
          mandatoryTeachingHours: values.mandatoryTeachingHours,
          color: values.color,
          continuousTeachingHours: values.maxTeachingHours,
          availabilities: availabilities.flat(),
          specialtyId: selectedSpecialty || "",
          schoolUnitId: "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b",
        };
        console.log("Data to submit:", dataToSubmit);
        await onSubmit(dataToSubmit);
        form.resetFields();
        setAvailabilities(initialAvailability.map(row => [...row]));
        form.resetFields();
        setAvailabilities(initialAvailability.map(row => [...row]));
        modifyIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
      modifyIsModalOpen(false);
    };

 useEffect(() => {
    async function fetchTeacherSpecialties() {
      try {
        const response = await axios.get("http://localhost:5191/api/specialties");
        const data  = response.data.specialties.sort((a: { code: string; title: string }, b: { code: string; title: string }) =>
              a.code.localeCompare(b.code)
            );
        setSpecialties(data);
      } catch (error) {
        console.error("Error fetching teacher specialties:", error);
      }
    }
    fetchTeacherSpecialties();
  }, []);

  return (
    <Modal
      //title={defaultEditValues ? "Edit Teacher" : "Add Teacher"}
      open={isModalOpen}
      onCancel={() => modifyIsModalOpen(false)}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" >
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="firstName"
            label="Όνομα"
            rules={[{ required: true, message: "Please input the teacher's first name!" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Επώνυμο"
            rules={[{ required: true, message: "Please input the teacher's last name!" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Ειδικότητα" name="specialty">
        <Select
          options={specialties.map((specialty) => ({
            key: specialty.id,
            value: specialty.id,
            label: `${specialty.code} - ${specialty.title}`,
          }))}
          placeholder="Επιλέξτε ειδικότητα"
          onChange={(value) => {
            form.setFieldsValue({ specialty: value });
            setSelectedSpecialty(value);
          }}
        />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="mandatoryTeachingHours"
            label="Υποχρεωτικές Ώρες Διδασκαλίας"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <InputNumber min={1} max={45} />
          </Form.Item>
          <Form.Item
            label="Χρώμα"
            name="color"
            style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16 }}
          >
            <ColorPicker onChange={(color) => form.setFieldsValue({ color: color.toHexString() })} />
          </Form.Item>
        </Form.Item>
        <Form.Item name="maxTeachingHours" label="Μέγιστες συνεχόμενες ώρες διδασκαλίας" initialValue={4}>
          <Slider
            min={1}
            max={7}
            step={1}
            marks={{
              1: '1',
              2: '2',
              3: '3',
              4: '4',
              5: '5',
              6: '6',
              7: '7',
            }}
          />
        </Form.Item>
        <Form.Item label="Διαθεσιμότητα εκπαιδευτικού" name="availability">
          <AvailabilityTable availability={availabilities} handleSelectSquare={handleSelectSquare} />
        </Form.Item>
      </Form>
    </Modal>
  );
}