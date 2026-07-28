import {
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { useEffect } from "react";
import type { GroupEntity, GroupPost } from "../types";
import { toast } from "react-toastify";

const SCHOOL_UNIT_ID = "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  defaultEditValues: GroupEntity | undefined;
  onSubmit: (group: GroupPost) => Promise<void>;
}

export default function AddEditGroup({
  isModalOpen,
  modifyIsModalOpen,
  defaultEditValues,
  onSubmit,
}: IProps) 
{
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    modifyIsModalOpen(false);
  };

  const handleOk = async () => {
    form.validateFields()
    .then(async (values) => {
      const dataToSubmit: GroupPost = {
        name: values.name,
        totalHours: values.totalHours,
        short: values.name,
        color: values.color,
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

  useEffect(() => {
    if(defaultEditValues) {
      console.log("Setting form values for editing:", defaultEditValues);
        form.setFieldsValue({
            name: defaultEditValues.name,
            totalHours: defaultEditValues.totalHours,
            color: defaultEditValues.color,
        });
    }
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