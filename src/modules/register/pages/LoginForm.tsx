import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { Link } from "react-router-dom";


export default function LoginForm() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Σύνδεση</h1>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ width: 500, height: "auto", border: "1px solid #f0f0f0", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"

          rules={[{ required: true, message: 'Παρακαλώ εισάγετε το Όνομα Χρήστη!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Όνομα Χρήστη" autoComplete="off" />
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
          <Button block type="primary" htmlType="submit">
            Σύνδεση
          </Button>
          ή <Link to="/register">Εγγραφή τώρα!</Link>
        </Form.Item>
      </Form>
    </div>
  );
} 