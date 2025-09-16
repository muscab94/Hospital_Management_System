import { useState, useEffect } from 'react';
import { getMedicalRecords } from '../services/medicalRecord';
import RecordCard from '../components/RecordCard';
// import Pagination from '../components/Pagination';

export default function MedicalRecordsList() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRecords = async () => {
    const res = await getMedicalRecords(page);
    console.log(res.data)
    setRecords(res.data.data);
    setTotalPages(res.data.pagination.pages);
  };

  useEffect(() => {
    fetchRecords();
  }, [page]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Medical Records</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map(record => (
          <RecordCard key={record._id} record={record} />
        ))}
      </div>
      {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
  );
}
