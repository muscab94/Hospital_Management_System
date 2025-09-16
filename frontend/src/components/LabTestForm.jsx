import { useState } from 'react';

export default function LabTestForm({ onSubmit }) {
  const [form, setForm] = useState({ testName: '', result: '', normalRange: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ testName: '', result: '', normalRange: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="testName"
        placeholder="Test Name"
        value={form.testName}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="result"
        placeholder="Result"
        value={form.result}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="normalRange"
        placeholder="Normal Range"
        value={form.normalRange}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Lab Test
      </button>
    </form>
  );
}
