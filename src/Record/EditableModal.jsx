import React, { useState } from "react";

const EditableModal = ({
  isOpen,
  onClose,
  onDelete,
  onSave,
  initialContent,
  initialTime,
  initialMemo,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(initialContent || "");
  const [editTime, setEditTime] = useState(initialTime || "");
  const [editMemo, setEditMemo] = useState(initialMemo || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 sm:w-3/4 lg:w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg space-y-4 font-Jrounded text-white">
        {!editMode ? (
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-bold">Time:</span> {initialTime + "時間" || "未設定"}
            </p>
            <p className="text-lg">
              <span className="font-bold">Content:</span> {initialContent || "未設定"}
            </p>
            <p className="text-lg">
              <span className="font-bold">Memo:</span> {initialMemo || "未設定"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-200 text-black font-bold rounded-lg hover:bg-blue-400 transition duration-300"
              >
                編集
              </button>
              <button
                onClick={onDelete}
                className="w-full sm:w-auto px-4 py-2 bg-red-200 text-black font-bold rounded-lg hover:bg-red-400 transition duration-300"
              >
                削除
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2 bg-yellow-200 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300"
              >
                閉じる
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="内容を編集"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600"
            />
            <input
              type="number"
              placeholder="時間を編集"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600"
            />
            <textarea
              placeholder="メモを編集"
              value={editMemo}
              onChange={(e) => setEditMemo(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600"
            ></textarea>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  onSave(editContent, editTime, editMemo);
                  setEditMode(false);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-green-200 text-black font-bold rounded-lg hover:bg-green-400 transition duration-300"
              >
                保存
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-400 transition duration-300"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableModal;
