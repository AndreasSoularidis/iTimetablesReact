import { Form, Input } from "antd";
import type { FormInstance } from "antd";

export default function AddDirector( { form }: { form: FormInstance }) {
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
        <Form.Item label="Email" name="email">
            <Input type="email" autoComplete="username" />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="password"
            label="Κωδικός Πρόσβασης"
            rules={[{ required: true, message: "Παρακαλώ εισάγετε κωδικό πρόσβασης" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16  }}
          >
            <Input type="password" autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Επιβεβαίωση Κωδικού Πρόσβασης"
            rules={[{ required: true, message: "Παρακαλώ επιβεβαιώστε κωδικό πρόσβασης" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)"}}
          >
            <Input type="password" autoComplete="new-password" />
          </Form.Item>
         
        </Form.Item>
        
      </Form>
    );
}