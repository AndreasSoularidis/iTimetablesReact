import {
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import type { SchoolClassEntity, ISchoolClassCreateRequest, LookUp } from "../types";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../shared/api/axiosInstance";

const SCHOOL_UNIT_ID = "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  defaultEditValues: SchoolClassEntity | undefined;
  onSubmit: (group: ISchoolClassCreateRequest) => Promise<void>;
}

export default function AddEditGroup({
  isModalOpen,
  modifyIsModalOpen,
  defaultEditValues,
  onSubmit,
}: IProps) 
{
  const [grades, setGrades] = useState<LookUp[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    modifyIsModalOpen(false);
  };

  const handleOk = async () => {
    form.validateFields()
    .then(async (values) => {
      const dataToSubmit: ISchoolClassCreateRequest = {
        name: values.name,
        totalHours: values.totalHours,
        short: values.name,
        color: values.color,
        gradeId: selectedGrade,
        schoolUnitId: SCHOOL_UNIT_ID,
      };
      await onSubmit(dataToSubmit);
      form.resetFields();
      modifyIsModalOpen(false);
    })
    .catch(() => {
      toast.error("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.");
    });
  };

  const matchGrade = (gradeCode: string) => {
    const grade = grades.find(g => g.id === gradeCode);
    setSelectedGrade(grade ? grade.id : "");
    return grade ? grade.description : "";
  }

  useEffect(() => {
    if(defaultEditValues) {
      console.log("Setting form values for editing:", defaultEditValues);
        form.setFieldsValue({
            name: defaultEditValues.name,
            totalHours: defaultEditValues.totalHours,
            grade: matchGrade(defaultEditValues.grade.id),
            color: defaultEditValues.color,
        });
    }

    async function fetchGrades() {
      try {
        const response = await axios.get(`${BASE_URL}/schoolgrades`);
        const data  = response.data.schoolGrades
        .sort((a: { id: string; description: string, schoolTypeId: string }, b: { id: string; description: string, schoolTypeId: string }) =>
              a.description.localeCompare(b.description));;
        setGrades(data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }
    fetchGrades();
    
  }, [defaultEditValues, form, isModalOpen]);

  return (
    <Modal
      title={defaultEditValues ? "Επεξεργασία Τμήματος" : "Προσθήκη Τμήματος"}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" >
        <Form.Item
          name="name"
          label="Όνομα Τμήματος"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το όνομα του τμήματος!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="grade"
          label="Τάξη"
          rules={[{ required: true, message: "Παρακαλώ επιλέξτε την τάξη!" }]}
        >
          <Select
          options={grades.map((grade) => ({
            key: grade.id,
            value: grade.id,
            label: grade.description,
          }))}
          placeholder="Επιλέξτε τάξη"
          onChange={(value) => {
            form.setFieldsValue({ grade: value });
            setSelectedGrade(value);
          }}
        />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="totalHours"
            label="Σύνολο Ωρών Διδασκαλίας"
            rules={[{ required: true, message: "Παρακαλώ εισάγετε το σύνολο ωρών διδασκαλίας!" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <InputNumber min={1} max={35} />
          </Form.Item>
         <Form.Item
            label="Χρώμα"
            name="color"
            style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16 }}
          >
            <ColorPicker onChange={(color) => form.setFieldsValue({ color: color.toHexString() })} />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
}