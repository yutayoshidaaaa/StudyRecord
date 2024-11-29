import React, { useState } from "react";
import SidebarContent from "./SidebarContent";
import Todo from "./Todo";
import { Link } from "react-router-dom";

const TopPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
     <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-10 rounded transition-all duration-300 "
      >
        <img src={`${process.env.PUBLIC_URL}/${isSidebarOpen ? "left.png" : "right.png"}`} 
        alt={isSidebarOpen ? "Close" : "Open" }
        className={`${
          isSidebarOpen ? "w-8 h-8 ml-48" : "w-8 h-8"
        }`}/>
      </button>


      <SidebarContent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`p-8 transition-allff ${isSidebarOpen ? "ml-64" : ""}`}>
        <h1 className="text-2xl font-fantasy font-bold mt-8">StudyRecord</h1>
        <h2 className="text-center text-7xl font-bold font-fantasy">TOP PAGE</h2>
        <Todo />
        <div className="flex justify-center items-center">
            <Link to="/record"
                  className="w-[32rem] h-20 border border-black rounded-xl px-6 py-3 m-8 whitespace-nowrap 
                  font-fantasy font-bold text-4xl hover:translate-y-2 duration-300 ease-in-out flex justify-center items-center">
              Let's keep record!
            </Link>

        </div>
      </div>
      
      
    </div>
    
  );
};

export default TopPage;
