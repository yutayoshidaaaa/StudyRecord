import { useState } from "react";
import AddSubject from "./AddSubject";
import SubjectSelector from "./SubjectSelector";
import RecordInput from "./RecordInput";
import Content from "./Content";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const getToday = () => new Date().toISOString().split("T")[0];

const Record = ({ isGuest }) => {
  const [records, setRecords] = useState(() => {
    if (isGuest) return {}; 
    const savedRecords = localStorage.getItem("records");
    return savedRecords ? JSON.parse(savedRecords) : {};
  });

  const [subjects, setSubjects] = useState(() => {
    if (isGuest) return []; 
    const savedSubjects = localStorage.getItem("subjects");
    return savedSubjects ? JSON.parse(savedSubjects) : [];
  });

  useEffect(() => {
    if (!isGuest) {
      localStorage.setItem("records", JSON.stringify(records));
    }
  }, [records, isGuest]);

  useEffect(() => {
    if (!isGuest) {
      localStorage.setItem("subjects", JSON.stringify(subjects));
    }
  }, [subjects, isGuest]);

  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [memoInput, setMemoInput] = useState("");
  const [dateInput, setDateInput] = useState(getToday());
  const [ExpandedMemo, setExpanededMemo] = useState("");
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject)) {
      setSubjects((prev) => [...prev, newSubject]);
      setRecords((prev) => ({ ...prev, [newSubject]: [] }));
      setNewSubject("");
    }
  };

  const addContent = () => {
    if (contentInput.trim() && timeInput.trim()) {
      const newRecord = {
        date: dateInput,
        content: contentInput,
        time: Number(timeInput),
        memo: memoInput,
      };
      setRecords((prevRecords) => ({
        ...prevRecords,
        [selectedSubject]: [...(prevRecords[selectedSubject] || []), newRecord],
      }));
      setContentInput("");
      setTimeInput("");
      setMemoInput("");
      setDateInput(getToday());
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center" id="main">
      <div className="w-full max-w-4xl mt-8 px-4">
        <div className="relative flex items-center justify-center">
          <Link
            to="/StudyRecord"
            className="absolute left-0 text-2xl text-yellow-200 font-fantasy"
          >
            Top
          </Link>
          <h1 className="font-bold text-5xl md:text-6xl text-center text-yellow-200 font-fantasy">
            Study Record
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl mt-8 px-4">
        <AddSubject
          newSubject={newSubject}
          setNewSubject={setNewSubject}
          addSubject={addSubject}
          selectedSubject={selectedSubject}
          subjects={subjects}
          setRecords={setRecords}
          setSubjects={setSubjects}
        />
        <SubjectSelector
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <RecordInput
          selectedSubject={selectedSubject}
          contentInput={contentInput}
          setContentInput={setContentInput}
          timeInput={timeInput}
          setTimeInput={setTimeInput}
          memoInput={memoInput}
          setMemoInput={setMemoInput}
          dateInput={dateInput}
          setDateInput={setDateInput}
          addContent={addContent}
        />
      </div>

      <div className="mt-8 w-full max-w-5xl px-4">
        <Content
          records={records}
          setExpandedMemo={setExpanededMemo}
          IsModalOpen={IsModalOpen}
          setIsModalOpen={setIsModalOpen}
          expandedMemo={ExpandedMemo}
          selectedSubject={selectedSubject}
          setRecords={setRecords}
        />
      </div>
    </div>
  );
};

export default Record;
