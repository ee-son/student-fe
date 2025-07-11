import React, { useState, useEffect } from 'react';

type StudentFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { namaDepan: string; namaBelakang: string; tanggalLahir: string }) => void;
  initialData?: {
    namaDepan: string;
    namaBelakang: string;
    tanggalLahir: string;
  };
  mode: 'create' | 'edit';
};

const StudentFormModal: React.FC<StudentFormProps> = ({ visible, onClose, onSubmit, initialData, mode }) => {
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');

  useEffect(() => {
    if (initialData) {
      setNamaDepan(initialData.namaDepan);
      setNamaBelakang(initialData.namaBelakang);
      setTanggalLahir(initialData.tanggalLahir);
    } else {
      setNamaDepan('');
      setNamaBelakang('');
      setTanggalLahir('');
    }
  }, [initialData, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{mode === 'create' ? 'Tambah Mahasiswa' : 'Edit Mahasiswa'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Depan"
            className="w-full p-2 border rounded"
            value={namaDepan}
            onChange={(e) => setNamaDepan(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nama Belakang"
            className="w-full p-2 border rounded"
            value={namaBelakang}
            onChange={(e) => setNamaBelakang(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">
            Batal
          </button>
          <button
            onClick={() => onSubmit({ namaDepan, namaBelakang, tanggalLahir })}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
          >
            {mode === 'create' ? 'Buat' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFormModal;
