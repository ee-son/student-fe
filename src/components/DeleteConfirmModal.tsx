import React from 'react';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
};

const DeleteConfirmModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  onConfirm,
  message = 'Apakah Anda yakin ingin menghapus mahasiswa ini?',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
        <p>{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
