"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { useRouter } from "next/navigation";
//import Login from "./pages/login/page";
const { Title, Text } = Typography;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("/api/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        message.success("User registered successfully!");
        router.push("/login"); // redirect to login page
      } else {
        message.error(data.error || "Registration failed");
      }
    } catch (error) {
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <Title level={3} className="text-center mb-6">
          Register
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" className="w-full">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Register
              </Button>
              <Button
                type="default"
                block
                onClick={() => router.push("/Login")}
              >
                Already have an account? Login
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
