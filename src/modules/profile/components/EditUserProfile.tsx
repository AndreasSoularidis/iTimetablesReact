import { Form, Modal, Input } from "antd";
import type { DirectorResponse, DirectorUpdateRequest } from "../types";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  defaultEditValues: DirectorResponse | null;
  onSubmit: (director: DirectorUpdateRequest) => Promise<void>;
}

export default function EditUserProfile({
  isModalOpen,
  modifyIsModalOpen,
  defaultEditValues,
  onSubmit,
}: IProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen && defaultEditValues) {
      form.setFieldsValue({
        FirstName: defaultEditValues.firstName,
        LastName: defaultEditValues.lastName,
        Username: defaultEditValues.username,
        Email: defaultEditValues.email,
      });
    }
  }, [isModalOpen, defaultEditValues, form]);

  const handleOk = async () => {
    form.validateFields()
      .then(async (values) => {
        const dataToSubmit: DirectorUpdateRequest = {
          id: defaultEditValues?.id || "",
          firstName: values.FirstName,
          lastName: values.LastName,
          username: values.Username,
          email: values.Email,
        };
        await onSubmit(dataToSubmit);
        form.resetFields();
      })
      .catch(() => {
        toast.error("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    modifyIsModalOpen(false);
  };

  return (
    <Modal
      title="Επεξεργασία Στοιχείων Προφίλ"
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
        <Form.Item
          label="Όνομα"
          name="FirstName"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το όνομα." }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Επώνυμο"
          name="LastName"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το επώνυμο." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Όνομα Χρήστη"
          name="Username"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το όνομα χρήστη." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το email." }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}