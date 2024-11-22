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
        <div className="flex justify-center items-center p-5 rounded-2xl">
          <div style={{ display: "flex", gap: "50px" }}>
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="rounded-2xl border-4 bg-gray-900 placeholder:font-bold font-Jrounded border-gray-300 placeholder-gray-200 outline-none text-white"
            />
            <textarea
              id="content-input"
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              placeholder={`${selectedSubject}の勉強内容を入力`}
              onKeyDown={handleKeyDown}
              className="w-56 h-24 border-4 pt-9 pl-2.5 rounded-2xl bg-gray-900 text-white font-Jrounded font-bold placeholder:font-bold border-gray-300 placeholder-gray-200 outline-none"
            />
            <input
              id="time-input"
              type="number"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              placeholder={`${selectedSubject}の勉強時間を入力`}
              onKeyDown={handleKeyDown}
              className="rounded-2xl border-4 bg-gray-900 placeholder:font-bold font-Jrounded border-gray-300 placeholder-gray-200 outline-none text-white"
            />
            <textarea
              id="memo-input"
              value={memoInput}
              onChange={(e) => setMemoInput(e.target.value)}
              placeholder="要点を入力してください"
              onKeyDown={handleKeyDown}
              className="w-56 h-24 border-4 pt-9 pl-2.5 rounded-2xl bg-gray-900 placeholder:font-bold font-Jrounded border-gray-300 placeholder-gray-200 outline-none text-white"
            />
            <button
              onClick={addContent}
              className="border-4 border-white w-16 h-10 m-6 rounded-2xl bg-yellow-200 font-bold font-Jrounded hover:shadow-white hover:bg-yellow-400 transition-colors duration-500"
            >
              追加
            </button>
          </div>
        </div>
      )
    );
  };
  
export default RecordInput;
  