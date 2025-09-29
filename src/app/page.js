"use client"

import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

export default function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        message.success('User registered successfully');
        form.resetFields();
      } else {
        message.error('Error: ' + data.error);
      }
    } catch (err) {
      message.error('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
