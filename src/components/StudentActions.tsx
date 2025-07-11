import React, { useState } from 'react';
import axios from 'axios';
import StudentFormModal from './StudentFormModal';

type Student = {
  id: string;
  namaDepan: string;
  namaBelakang: string;
  tanggalLahir: string;
};

type Props = {
  student?: Student;
  onSuccess: () => void;
  isCreate?: boolean;
};

const StudentActions: React.FC<Props> = ({ student, onSuccess, isCreate = false }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCreate = (data: Omit<Student, 'id'>) => {
    axios.post('http://127.0.0.1:8080/api/students', data)
      .then(() => {
        setShowModal(false);
        onSuccess();
      })
      .catch(console.error);
  };

  const handleUpdate = (data: Omit<Student, 'id'>) => {
    if (!student) return;
    axios.put(`http://127.0.0.1:8080/api/students/${student.id}`, { ...student, ...data })
      .then(() => {
        setShowModal(false);
        onSuccess();
      })
      .catch(console.error);
  };

  const handleDelete = () => {
    if (!student) return;
    if (confirm('Yakin ingin menghapus mahasiswa ini?')) {
      axios.delete(`http://127.0.0.1:8080/api/students/${student.id}`)
        .then(onSuccess)
        .catch(console.error);
    }
  };

  return (
    <>
      {isCreate ? (
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Tambah Mahasiswa
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
            Hapus
          </button>
        </div>
      )}

      <StudentFormModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={isCreate ? handleCreate : handleUpdate}
        mode={isCreate ? 'create' : 'edit'}
        initialData={
          isCreate
            ? undefined
            : {
                namaDepan: student?.namaDepan || '',
                namaBelakang: student?.namaBelakang || '',
                tanggalLahir: student?.tanggalLahir || '',
              }
        }
      />
    </>
  );
};

export default StudentActions;
