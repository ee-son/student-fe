import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentActions from './StudentActions';

type Student = {
  id: string;
  namaDepan: string;
  namaBelakang: string;
  tanggalLahir: string;
};

const StudentsTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = () => {
    axios
      .get('http://127.0.0.1:8080/api/students')
      .then((res) => setStudents(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Calculate age function
  const calculateAge = (birthdate: string): number => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Daftar Mahasiswa</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">ID</th>
              <th className="text-left px-6 py-3">Nama</th>
              <th className="text-left px-6 py-3">Umur</th>
              <th className="text-left px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="text-left px-6 py-4">{student.id}</td>
                <td className="text-left px-6 py-4">
                  {student.namaDepan} {student.namaBelakang}
                </td>
                <td className="text-left px-6 py-4">
                  {calculateAge(student.tanggalLahir)} tahun
                </td>
                <td className="text-left px-6 py-4">
                  <StudentActions student={student} onSuccess={fetchStudents} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4 justify-center">
            <StudentActions isCreate onSuccess={fetchStudents} />
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
