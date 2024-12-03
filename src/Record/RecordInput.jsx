

const RecordInput = ({
    selectedSubject,
    contentInput,
    setContentInput,
    timeInput,
    setTimeInput,
    memoInput,
    setMemoInput,
    dateInput,
    setDateInput,
    addContent,
  }) => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const targetId = e.target.id;
        if (targetId === "memo-input") {
          addContent();
        } else if (targetId === "content-input") {
          document.getElementById("time-input").focus();
        } else if (targetId === "time-input") {
          document.getElementById("memo-input").focus();
        }
      }
    };
  
    return (
      selectedSubject && (
        <div className="flex flex-col gap-6 items-center justify-center p-5 w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full max-w-md lg:max-w-lg rounded-2xl border-4 bg-gray-900 placeholder:font-bold font-Jrounded border-gray-300 placeholder-gray-200 outline-none text-white"
          />
          <input
            id="time-input"
            type="number"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder={`${selectedSubject}の勉強時間を入力`}
            className="w-full max-w-md lg:max-w-lg rounded-2xl border-4 bg-gray-900 placeholder:font-bold font-Jrounded border-gray-300 placeholder-gray-200 outline-none text-white"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <textarea
            id="content-input"
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            placeholder={`${selectedSubject}の勉強内容を入力`}
            className="w-full max-w-lg h-28 border-4 rounded-2xl bg-gray-900 text-white font-Jrounded font-bold placeholder:font-bold border-gray-300 placeholder-gray-200 outline-none"
          />
          <textarea
            id="memo-input"
            value={memoInput}
            onChange={(e) => setMemoInput(e.target.value)}
            placeholder="要点を入力してください"
            className="w-full max-w-lg h-28 border-4 rounded-2xl bg-gray-900 text-white font-Jrounded font-bold placeholder:font-bold border-gray-300 placeholder-gray-200 outline-none"
          />
        </div>
        <button
          onClick={addContent}
          className="w-36 h-14 bg-yellow-200 rounded-2xl font-bold hover:bg-yellow-400 transition"
        >
          追加
        </button>
      </div>
            
      
      )
    );
  };
  
export default RecordInput;