import { useState } from "react";
import EditableModal from "./EditableModal";

const Content = ({
  records,
  setRecords,  
  selectedSubject,
  IsModalOpen,
  setIsModalOpen,
  expandedMemo,
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
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-white font-Jrounded mb-6">
          一覧
        </h1>

        <table className="table-auto w-full border-collapse border border-gray-400 text-white font-Jrounded">
          <thead className="bg-gray-700">
            <tr>
              <th className="border border-gray-400 px-4 py-2">日付</th>
              <th className="border border-gray-400 px-4 py-2">内容</th>
              <th className="border border-gray-400 px-4 py-2">時間</th>
              <th className="border border-gray-400 px-4 py-2">メモ</th>
              <th className="border border-gray-400 px-4 py-2">詳細</th>
            </tr>
          </thead>

          <tbody>
            {(records[selectedSubject] || []).length > 0 ? (
              records[selectedSubject].map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-500" : "bg-gray-700"
                  }`}
                >
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {item.date}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {item.content}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {item.time}時間
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center ">
                    {item.memo.length > 20
                      ? `${item.memo.slice(0, 30)}...`
                      : item.memo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        openModal(item.memo, item);
                      }}
                      className="px-4 py-2 bg-yellow-200 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300"
                    >
                      詳細
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-white">
                  データがありません
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h2 className="flex justify-center items-center font-bold font-Jrounded text-2xl mx-96 text-white mt-16">
          合計時間: {totalHours}時間
        </h2>
        <br />
        <h3 className="mx-96 font-bold text-white font-Jrounded">メモの詳細</h3>
        <hr className="border-2  my-2 mx-96 border-yellow-200" />
    
        

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
