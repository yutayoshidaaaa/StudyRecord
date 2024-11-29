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
    <div className="mx-96">
      <div>
        {!editMode ? (
          <div className="space-y-4 font-Jrounded">
            <p className="text-white">Time : {initialTime + "時間"|| "未設定"}</p>
            <p className="text-white">Content : {initialContent || "未設定"}</p>
            <p className="text-white">Memo : {initialMemo || "未設定"}</p>
            <br />
            <div className="flex gap-4">
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-200 text-black font-bold rounded-lg hover:bg-blue-400 transition duration-300 font-Jrounded"
              >
                編集
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-200 text-black font-bold rounded-lg hover:bg-red-400 transition duration-300 font-Jrounded"
              >
                削除
              </button>
              <button
                onClick={() => {
                  setEditMode(false); 
                  onClose();  
                }}
                className="px-4 py-2 bg-yellow-200 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300"
              >
                閉じる
              </button>
            </div>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="内容を編集"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="block w-full p-2 mb-2"
            />
            <input
              type="number"
              placeholder="時間を編集"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="block w-full p-2 mb-2"
            />
            <textarea
              placeholder="メモを編集"
              value={editMemo}
              onChange={(e) => setEditMemo(e.target.value)}
              className="block w-full p-2 mb-4"
            ></textarea>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onSave(editContent, editTime, editMemo);
                  setEditMode(false);  
                }}
                className="px-4 py-2 bg-green-200 text-black font-bold rounded-lg hover:bg-green-400 transition duration-300"
              >
                保存
              </button>
              <button
                onClick={() => {
                  setEditMode(false); 
                  onClose();  
                }}
                className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-400 transition duration-300"
              >
                キャンセル
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditableModal;
