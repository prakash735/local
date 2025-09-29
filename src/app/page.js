"use client"

import { useState } from 'react';
export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password:
      ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      alert('User registered successfully');
    } else {
      alert('Error: ' + data.error);
    }
  };1
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value
        })}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password:e.target.value
        })}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
