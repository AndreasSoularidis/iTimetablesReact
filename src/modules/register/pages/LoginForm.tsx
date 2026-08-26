import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "./Register";
import { RegistrationService } from "../services/RegistrationService";


export default function LoginForm() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    form.validateFields().then(async (values) => {
      const loginData = {
        email: values.email,
        password: values.password,
      };
      const result = await RegistrationService.login(loginData);
      if (result) {
        navigate("/home");
      }
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Σύνδεση</h1>
      <Form
        name="login"
        form={form}
        initialValues={{ remember: true }}
        style={{ width: 500, height: "auto", border: "1px solid #f0f0f0", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Παρακαλώ εισάγετε το email!' },
            { type: 'email', message: 'Παρακαλώ εισάγετε ένα έγκυρο email!' }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Παρακαλώ εισάγετε τον Κωδικό!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Κωδικός" autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Link to="/forgot-password">Ξεχάσατε τον Κωδικό;</Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" onClick={handleLogin} htmlType="submit">
            Σύνδεση
          </Button>
          ή <Button type="link" style={{ padding: 0 }} onClick={() => setRegisterOpen(true)}>Εγγραφή τώρα!</Button>
        </Form.Item>
      </Form>
      <Register open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </div>
  );
} 