import { Link } from 'react-router-dom';

export default function RecordCard({ record }) {
  return (
    <Link to={`/Dashboard/medical-records/${record._id}`} className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="font-semibold">{record.patient.firstName} {record.patient.lastName}</h3>
      <p className="text-gray-600">Doctor: {record.doctor.name}</p>
      <p className="text-gray-600">Visit: {new Date(record.visitDate).toLocaleDateString()}</p>
      <p className="text-gray-600">Diagnosis: {record.diagnosis}</p>
    </Link>
  );
}
