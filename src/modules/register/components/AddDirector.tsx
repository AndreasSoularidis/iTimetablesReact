import { Form, Input } from "antd";
import type { FormInstance } from "antd";

export default function AddDirector({ form }: { form: FormInstance }) {
  return (
    <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="firstName"
          label="Όνομα"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το όνομα" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Επώνυμο"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το επώνυμο" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          label="Email"
          name="email"
          style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16 }}
        >
          <Input type="email" autoComplete="username" />
        </Form.Item>
        <Form.Item
          name="username"
          label="username"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε το username" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="password"
          label="Κωδικός Πρόσβασης"
          rules={[
            { required: true, message: "Παρακαλώ εισάγετε κωδικό πρόσβασης" },
            () => ({
              validator(_, value) {
                if (!value || value.length >= 8) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες'));
              },
            })]}
          style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16 }}
        >
          <Input.Password type="password" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Επιβεβαίωση Κωδικού Πρόσβασης"
          rules={[
            { required: true, message: "Παρακαλώ επιβεβαιώστε κωδικό πρόσβασης" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Οι κωδικοί πρόσβασης δεν ταιριάζουν!'));
              },
            }),]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input.Password type="password" autoComplete="new-password" />
        </Form.Item>

      </Form.Item>

    </Form>
  );
}