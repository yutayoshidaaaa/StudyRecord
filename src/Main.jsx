import { useState } from "react";
import AddSubject from "./AddSubject";
import SubjectSelector from "./SubjectSelector"
import RecordInput from "./RecordInput"
import Content from "./Content";
import { useEffect } from "react";

const getToday = () => new Date().toISOString().split("T")[0];

const Record = () => {
    const [records, setRecords] = useState(() => {
      const savedRecords = localStorage.getItem("records");
      return savedRecords ? JSON.parse(savedRecords) : {};
    });
    const [subjects, setSubjects] = useState(() => {
      const savedSubjects = localStorage.getItem("subjects");
      return savedSubjects ? JSON.parse(savedSubjects) : [];
  });


    useEffect(() => {
        localStorage.setItem("records", JSON.stringify(records));
      }, [records]);

    useEffect(() => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);
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
      <div className="bg-gray-900 min-h-screen">
        <h1 className="font-bold text-7xl flex justify-center items-center text-yellow-200 font-fantasy">
          Study Record
        </h1>
        <AddSubject
          newSubject={newSubject}
          setNewSubject={setNewSubject}
          addSubject={addSubject}
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
    );
  };
  
  export default Record;