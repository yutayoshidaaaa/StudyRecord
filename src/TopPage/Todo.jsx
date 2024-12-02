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
    const [isChecked, setIsChecked] = useState(false);

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
                isChecked: false,
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

    const handleCheckboxChange = (index) => (e) => {
        const updatedResults = result.map((task, i) =>
            i === index ? { ...task, isChecked: e.target.checked } : task
        );
        setResult(updatedResults);
    
        if (Detailcontent && Detailcontent.content === result[index].content) {
            setDetailContent(updatedResults[index]);
        }
    };
    


    return (
        <>
            <h1 className="text-4xl font-Yusei font-bold my-8 text-center" id="Todo">
                今日のタスクを決めよう！
            </h1>
    
            <div className="container mx-auto flex flex-col lg:flex-row lg:space-x-8 px-4">
                <div className="flex flex-col space-y-4 p-8 lg:w-1/4 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold font-Yusei">タスクを作成</h2>
                    <input
                        type="text"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="w-full h-12 border-2 border-gray-300 font-Yusei rounded-lg px-4"
                    />
    
                    <textarea
                        value={contentInput}
                        onChange={(e) => setContentInput(e.target.value)}
                        placeholder="今日やることを入力"
                        className="w-full h-16 border-2 border-gray-300 font-Yusei rounded-lg px-4"
                    />
    
                    <input
                        type="number"
                        value={timeInput}
                        onChange={(e) => setTimeInput(e.target.value)}
                        placeholder="目標時間を入力"
                        className="w-full h-12 border-2 border-gray-300 font-Yusei rounded-lg px-4"
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-4 py-2 px-4 border-2 border-black font-Yusei rounded-lg w-full
                                   hover:bg-gray-100 transition duration-300"
                    >
                        リストに追加
                    </button>
                </div>
   
                <div className="lg:w-2/4 p-8">
                    <h2 className="text-xl font-bold font-Yusei">今日のTodoリスト</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {result.map((task, index) => (
                            <li
                                key={index}
                                className={`p-4 rounded-lg shadow-lg 
                                    ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}
                            >
                                <div>
                                    <p className="font-Yusei flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={task.isChecked}
                                            onChange={handleCheckboxChange(index)}
                                        />
                                        <span>
                                            {task.content.length > 8
                                                ? `${task.content.slice(0, 8)}...`
                                                : task.content}
                                        </span>
                                    </p>
                                    <p className="font-Yusei text-sm text-gray-600">
                                        目標時間: {task.time}時間
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        className="text-blue-500 underline font-Yusei"
                                        onClick={() => handleDetail(task)}
                                    >
                                        詳細
                                    </button>
                                    <div className="flex space-x-4">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/edit.png`}
                                            alt="edit"
                                            className="w-6 h-6 cursor-pointer"
                                            onClick={() => handleEdit(index)}
                                        />
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/delete.png`}
                                            alt="delete"
                                            className="w-6 h-6 cursor-pointer"
                                            onClick={() => handleDelete(index)}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
    
                <div className="lg:w-1/4 p-8 bg-white shadow-lg rounded-lg">
                    <h3 className="text-xl font-bold mb-4 font-Yusei">詳細内容</h3>
                    {Detailcontent &&
                        result.some((task) => task.content === Detailcontent.content) && (
                            <div className="mt-4 space-y-2">
                                <p className="font-Yusei">日付: {Detailcontent.date}</p>
                                <p className="font-Yusei">内容: {Detailcontent.content}</p>
                                <p className="font-Yusei">目標時間: {Detailcontent.time}時間</p>
                                {Detailcontent.isChecked && (
                                    <p className="font-Yusei text-green-500 font-bold">完了</p>
                                )}
                            </div>
                        )}
                </div>
            </div>
        </>
    );
    
};

export default Todo;
