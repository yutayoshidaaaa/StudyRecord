import { useEffect, useState } from "react";

const getToday = () => new Date().toISOString().split("T")[0];

const Todo = () => {
    const [contentInput, setContentInput] = useState("");
    const [timeInput, setTimeInput] = useState("");
    const [dateInput, setDateInput] = useState(getToday());
    const [result, setResult] = useState([]);
    const [Detailcontent, setDetailContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState({ date: "", content: "", time: "" });

    useEffect(() => {
        const savedResults = JSON.parse(localStorage.getItem("todoResults"));
        if (savedResults) {
            setResult(savedResults);
        }
    }, []);

    useEffect(() => {
        if (result.length > 0) {
            localStorage.setItem("todoResults", JSON.stringify(result)); 
        }
    }, [result]);

    const handleSubmit = () => {
        if (!dateInput || !contentInput || !timeInput) {
            alert("全ての項目を入力してください");
            return;
        }

        if (result.length > 5) {
            alert("最大６個までしか追加できません");
            return;
        }

        setResult((prevResults) => [
            ...prevResults,
            {
                date: dateInput,
                content: contentInput,
                time: timeInput,
            },
        ]);

        setDateInput(getToday());
        setContentInput("");
        setTimeInput("");
    };

    const handleDetail = (content) => {
        setDetailContent(content);
    };

    const handleDelete = (index) => {
        const updated = result.filter((_, i) => i !== index);
        setResult(updated);
        setDetailContent(null);
        localStorage.setItem("todoResults", JSON.stringify(updated)); 
    };

    const handleEdit = (index) => {
        setEditTask({ ...result[index] });
        setEditIndex(index);
        setIsModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (!editTask.date || !editTask.content || !editTask.time) {
            alert("全ての項目を入力してください");
            return;
        }

        const updatedResults = [...result];
        updatedResults[editIndex] = editTask;
        setResult(updatedResults);
        setIsModalOpen(false);
    };

    return (
        <>
            <h1 className="text-4xl font-Yusei font-bold m-8" id="Todo">今日のタスクを決めよう！</h1>

            <div className="flex border-x-2">
                <div className="flex flex-col space-y-4 m-8 w-1/5 border-r-8">
                    <h2 className="text-xl font-bold font-Yusei">タスクを作成</h2>
                    <input
                        type="text"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="max-w-48 h-16 border-2 border-black font-Yusei rounded-2xl"
                    />

                    <textarea
                        type="text"
                        value={contentInput}
                        onChange={(e) => setContentInput(e.target.value)}
                        placeholder="今日やることを入力"
                        className="max-w-48 h-16 border-2 border-black font-Yusei rounded-2xl"
                    />

                    <input
                        type="number"
                        value={timeInput}
                        onChange={(e) => setTimeInput(e.target.value)}
                        placeholder="目標時間を入力"
                        className="max-w-48 h-16 border-2 border-black font-Yusei rounded-2xl"
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-4 p-2 border-2 border-black font-Yusei rounded-2xl max-w-32
                                   hover:translate-y-2 duration-300 ease-in-out"
                    >
                        リストに追加
                    </button>
                </div>

                {result.length > -1 && (
                    <div className="w-3/5 pr-4 border-r-8">
                        <h2 className="text-xl font-bold font-Yusei mt-8">今日のTodoリスト</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            {result.map((result, index) => (
                                <li
                                    key={index}
                                    className={`m-4 flex justify-between items-center p-4 rounded-2xl
                                        ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}`}
                                >
                                    <div>
                                        <p className="font-Yusei">
                                            {index + 1}:{" "}
                                            {result.content.length > 8
                                                ? `${result.content.slice(0, 8)}...`
                                                : result.content}
                                        </p>
                                        <p className="font-Yusei">目標時間: {result.time}時間</p>
                                    </div>
                                    <button
                                        className="border border-black rounded-xl px-4 py-1 ml-4 whitespace-nowrap font-Yusei"
                                        onClick={() => handleDetail(result)}
                                    >
                                        詳細
                                    </button>
                                    <div className="absolute bottom-0 right-72 gap-8 flex mb-80">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/edit.png`}
                                            alt="edit"
                                            className="w-10 h-10"
                                            onClick={() => handleEdit(index)}
                                        />
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/delete.png`}
                                            alt="delete"
                                            className="w-10 h-10"
                                            onClick={() => handleDelete(index)}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="w-96 mt-8">
                    <h3 className="text-xl font-bold mb-4 font-Yusei">詳細内容</h3>
                    {Detailcontent && (
                        <div className="mt-4 pr-4 space-y-2">
                            <p className="font-Yusei">日付: {Detailcontent.date}</p>
                            <p className="font-Yusei">内容: {Detailcontent.content}</p>
                            <p className="font-Yusei">目標時間: {Detailcontent.time}時間</p>
                        </div>
                    )}
                </div>

                {isModalOpen && (
                    <div>
                        <div className="flex flex-col space-y-2">
                            <h2 className="font-Yusei font-bold">タスクを編集</h2>
                            <input
                                type="text"
                                value={editTask.date}
                                onChange={(e) => setEditTask({ ...editTask, date: e.target.value })}
                                className="border-2 border-black rounded-xl font-Yusei"
                            />

                            <textarea
                                value={editTask.content}
                                onChange={(e) => setEditTask({ ...editTask, content: e.target.value })}
                                className="border-2 border-black rounded-xl font-Yusei"
                            />

                            <input
                                type="number"
                                value={editTask.time}
                                onChange={(e) => setEditTask({ ...editTask, time: e.target.value })}
                                className="border-2 border-black rounded-xl font-Yusei"
                            />

                            <div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="m-2 font-Yusei"
                                >
                                    キャンセル
                                </button>

                                <button
                                    onClick={handleSaveEdit}
                                    className="m-2 font-Yusei"
                                >
                                    保存
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Todo;
