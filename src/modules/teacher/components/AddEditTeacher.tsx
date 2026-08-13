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
import type { TeacherEntity, TeacherPost, Specialty } from "../types";
import { toast } from "react-toastify";
import axiosInstance from "../../../shared/api/axiosInstance";

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
  defaultEditValues: TeacherEntity | undefined;
  onSubmit: (teacher: TeacherPost) => Promise<void>;
}

export default function AddEditTeacher({
  isModalOpen,
  modifyIsModalOpen,
  defaultEditValues,
  onSubmit,
}: IProps) {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
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

  const to2D = (flat: number[], cols = 6): number[][] =>
    Array.from({ length: flat.length / cols }, (_, i) =>
    flat.slice(i * cols, i * cols + cols)
  );

  const handleCancel = () => {
    form.resetFields();
    setAvailabilities(initialAvailability.map(row => [...row]));
    setSelectedSpecialty(null);
    modifyIsModalOpen(false);
  };

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
      await onSubmit(dataToSubmit);
      form.resetFields();
      setAvailabilities(initialAvailability.map(row => [...row]));
      modifyIsModalOpen(false);
    })
    .catch(() => {
      toast.error("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.");
    });
  };

  const matchSpecialty = (specialtyCode: string) => {
    const specialty = specialties.find(s => s.code === specialtyCode);
    setSelectedSpecialty(specialty ? specialty.id : null);
    return specialty ? `${specialty.code} - ${specialty.title}` : "";
  }

  useEffect(() => {
    if(defaultEditValues) {
      console.log("Setting form values for editing:", defaultEditValues);
        form.setFieldsValue({
            firstName: defaultEditValues.name.split(" ")[0],
            lastName: defaultEditValues.name.split(" ")[1] || "",
            mandatoryTeachingHours: defaultEditValues.mandatoryTeachingHours,
            maxTeachingHours: defaultEditValues.continuousTeachingHours,
            color: defaultEditValues.color,
            specialty: matchSpecialty(defaultEditValues.specialty),
        });
      setAvailabilities(to2D(defaultEditValues.availabilities));  
    }

    async function fetchTeacherSpecialties() {
      try {
        const response = await axiosInstance.get("/specialties");
        const data  = response.data.specialties.sort((a: { code: string; title: string }, b: { code: string; title: string }) =>
              a.code.localeCompare(b.code)
            );
        setSpecialties(data);
      } catch (error) {
        console.error("Error fetching teacher specialties:", error);
      }
    }
    fetchTeacherSpecialties();
  }, [defaultEditValues, form, isModalOpen]);

  return (
    <Modal
      title={defaultEditValues ? "Επεξεργασία Εκπαιδευτικού" : "Προσθήκη Εκπαιδευτικού"}
      open={isModalOpen}
      onCancel={handleCancel}
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