// src/pages/MedicalRecordDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMedicalRecord, addLabTest } from '../services/medicalRecord';
import LabTestForm from '../components/LabTestForm';
import toast from 'react-hot-toast';

export default function MedicalRecordDetails() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecord = async () => {
    try {
      setLoading(true);
      const res = await getMedicalRecord(id);
      setRecord(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load medical record", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const handleAddLabTest = async (data) => {
    try {
      await addLabTest(id, data);
      toast.success("Lab test added successfully!", { position: "top-center" });
      fetchRecord(); // refresh the record
    } catch (error) {
      console.error(error);
      toast.error("Failed to add lab test", { position: "top-center" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!record) return <p>No medical record found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {record.patient.firstName} {record.patient.lastName}
      </h2>
      <p className="mb-2">Doctor: {record.doctor.name}</p>
      <p className="mb-2">Diagnosis: {record.diagnosis}</p>
      <p className="mb-2">Treatment: {record.treatment}</p>

      <h3 className="mt-4 font-semibold">Lab Tests</h3>
      <ul className="mb-4">
        {record.labTests.length > 0 ? (
          record.labTests.map((lab, idx) => (
            <li key={idx}>
              {lab.testName}: {lab.result} ({lab.normalRange})
            </li>
          ))
        ) : (
          <li>No lab tests added yet.</li>
        )}
      </ul>

      <h3 className="mt-4 font-semibold">Add Lab Test</h3>
      <LabTestForm onSubmit={handleAddLabTest} />
    </div>
  );
}
