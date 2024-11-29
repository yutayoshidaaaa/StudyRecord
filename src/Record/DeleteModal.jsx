const DeleteModal = ({ isOpen, onClose, onConfirm, subject }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <p className="text-lg font-bold mb-4">
            {subject} を削除しますか？
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
            >
              キャンセル
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    );
  };

export default DeleteModal;