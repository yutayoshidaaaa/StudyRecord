import { useState } from "react";
import EditableModal from "./EditableModal";

const Content = ({
  records,
  setRecords,
  selectedSubject,
  setIsModalOpen,
  setExpandedMemo,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const openModal = (memoContent, record) => {
    setExpandedMemo(memoContent);
    setIsModalOpen(true);
    setCurrentRecord(record);
    setIsEditModalOpen(true);
  };

  const handleSave = (content, time, memo) => {
    if (currentRecord) {
      const updatedRecord = { ...currentRecord, content, time, memo };
      setRecords((prevRecords) => ({
        ...prevRecords,
        [selectedSubject]: prevRecords[selectedSubject].map((rec) =>
          rec === currentRecord ? updatedRecord : rec
        ),
      }));
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (currentRecord) {
      setRecords((prevRecords) => ({
        ...prevRecords,
        [selectedSubject]: prevRecords[selectedSubject].filter(
          (rec) => rec !== currentRecord
        ),
      }));
      setIsEditModalOpen(false);
    }
  };

  const totalHours =
    records[selectedSubject]?.reduce((sum, record) => sum + record.time, 0) ||
    0;

  return (
    <>
      <div className="p-4 lg:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white font-Jrounded mb-6">
          一覧
        </h1>

        <div className="overflow-x-auto p-4">
          <table className="table-auto w-full border-collapse border border-gray-400 text-sm sm:text-base text-center">
            <thead className="bg-gray-700">
              <tr className="text-white font-Jrounded">
                <th className="border border-gray-400 px-4 py-2">日付</th>
                <th className="border border-gray-400 px-4 py-2">内容</th>
                <th className="border border-gray-400 px-4 py-2">時間</th>
                <th className="border border-gray-400 px-4 py-2">メモ</th>
                <th className="border border-gray-400 px-4 py-2">詳細</th>
              </tr>
            </thead>
            <tbody>
              {records[selectedSubject]?.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-500" : "bg-gray-700"
                  } hover:bg-gray-600 font-Jrounded text-white`}
                >
                  <td className="border border-gray-400 px-4 py-2">{row.date}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.content}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.time}時間</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {row.memo.length > 20
                      ? `${row.memo.slice(0, 20)}...`
                      : row.memo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      onClick={() => openModal(row.memo, row)}
                      className="px-4 py-2 bg-yellow-200 text-black font-bold rounded-lg hover:bg-yellow-400"
                    >
                      詳細
                    </button>
                  </td>
                </tr>
              ))}
              {(!records[selectedSubject] ||
                records[selectedSubject].length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-white font-Jrounded py-4"
                  >
                    データがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="flex justify-center items-center font-bold font-Jrounded text-xl sm:text-2xl lg:text-3xl text-white mt-6">
          合計時間: {totalHours}時間
        </h2>

        {isEditModalOpen && currentRecord && (
          <EditableModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSave}
            onDelete={handleDelete}
            initialContent={currentRecord.content}
            initialTime={currentRecord.time}
            initialMemo={currentRecord.memo}
          />
        )}
      </div>
    </>
  );
};

export default Content;
