const Addsubject = ({ newSubject, setNewSubject, addSubject }) => {
    return (
        <>
            <div className="flex justify-center items-center">
                <input type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="科目を追加"
                onFocus={() => setNewSubject("")} 
                className="w-40 h-12 m-8 bg-gray-900 text-white border-2  placeholder:font-Jrounded rounded-2xl outline-none"/>

                <button onClick={addSubject}
                    className="w-24 h-8 rounded-2xl bg-yellow-200 
                    border-4 border-white text-black font-Jrounded 
                  placeholder-gray-200 font-bold placeholder:font-Jrounded outline-none"
                >
                    科目を追加
                </button>
            </div>
        
        </>
    );
}


export default Addsubject;