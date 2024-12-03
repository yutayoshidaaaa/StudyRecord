import { useState } from "react";

const AddSubject = ({
  newSubject,
  setNewSubject,
  addSubject,
  subjects,
  setSubjects,
  setRecords,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteSubject, setSelectedDeleteSubject] = useState("");

  const deleteSubject = (subject) => {
    if (!subject) return;

    if (window.confirm(`${subject}を削除しますか？データは戻りません`)) {
      setSubjects((prevSubjects) => prevSubjects.filter((s) => s !== subject));
      setRecords((prevRecords) => {
        const updatedRecords = { ...prevRecords };
        delete updatedRecords[subject];
        return updatedRecords;
      });

      alert(`${subject}が削除されました`);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="科目を追加"
          className="w-full sm:w-1/2 lg:w-1/3 h-12 bg-gray-900 text-white border-2 
                     placeholder:font-Jrounded rounded-2xl outline-none"
        />
        <button
          onClick={addSubject}
          className="w-full sm:w-32 h-12 rounded-2xl bg-yellow-200 border-4 border-white text-black font-Jrounded font-bold"
        >
          科目を追加
        </button>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gray-500 text-white font-bold rounded hover:bg-red-700 font-Jrounded"
        >
          科目削除
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-900 p-6 rounded shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-200 font-Jrounded mb-4">
                科目を削除
              </h2>
              <select
                value={selectedDeleteSubject}
                onChange={(e) => setSelectedDeleteSubject(e.target.value)}
                className="w-40 lg:w-48 h-12 rounded-2xl border-4 bg-yellow-200 text-black font-bold placeholder:font-bold border-gray-300 placeholder-gray-200 outline-none text-center"
              >
                <option value="">科目を選択</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <div className="flex justify-between gap-4 mt-4">
                <button
                  onClick={() => {
                    deleteSubject(selectedDeleteSubject);
                    setIsModalOpen(false);
                  }}
                  disabled={!selectedDeleteSubject}
                  className={`w-full px-4 py-2 font-bold rounded ${
                    selectedDeleteSubject
                      ? "bg-red-500 text-white hover:bg-red-700 font-Jrounded"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed font-Jrounded"
                  }`}
                >
                  削除
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-4 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700 font-Jrounded"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddSubject;
