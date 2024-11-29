

const SubjectSelector = ({ subjects, selectedSubject, setSelectedSubject }) => {

    return (
        <>
            <div className="flex justify-center p-5 mr-20 rounded-2xl">
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-90 h-25 border-4 border-white bg-yellow-200 font-bold font-Jrounded text-black rounded-2xl hover:shadow-white"
                >
                    <option value="">科目を選択</option>
                    {subjects?.map((kamoku, index) => (
                        <option key={index} value={kamoku}>
                            {kamoku}
                        </option>
                    ))}
                </select>
                <h2 className="ml-5 font-bold text-white font-Jrounded">
                    選択中の科目: {selectedSubject}
                </h2>

         



            
            </div>
        </>
    );
};

export default SubjectSelector;
