import React from 'react';

type Student = {
  id: number;
  namaLengkap: string;
  umur: number;
};

const students: Student[] = [
  { id: 1, namaLengkap: 'Mister Hansen', umur: 22 },
  { id: 2, namaLengkap: 'Rina Kartika Sari', umur: 20 },
  { id: 3, namaLengkap: 'Budi Santoso', umur: 23 },
];

const StudentsTable: React.FC = () => {
  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Daftar Mahasiswa</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">ID</th>
              <th className="text-left px-6 py-3">Nama Lengkap</th>
              <th className="text-left px-6 py-3">Umur</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{student.id}</td>
                <td className="px-6 py-4">{student.namaLengkap}</td>
                <td className="px-6 py-4">{student.umur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
