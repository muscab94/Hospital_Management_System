import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMedicalRecord, addLabTest } from '../services/medicalRecord';
import LabTestForm from '../components/LabTestForm';

export default function MedicalRecordDetails() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  const fetchRecord = async () => {
    const res = await getMedicalRecord(id);
    setRecord(res.data.data);
  };

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const handleAddLabTest = async (data) => {
    await addLabTest(id, data);
    fetchRecord(); // refresh
  };

  if (!record) return <p>Loading...</p>;

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
        {record.labTests.map((lab, idx) => (
          <li key={idx}>
            {lab.testName}: {lab.result} ({lab.normalRange})
          </li>
        ))}
      </ul>

      <LabTestForm onSubmit={handleAddLabTest} />
    </div>
  );
}
