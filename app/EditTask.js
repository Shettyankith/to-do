import React, { useState } from "react";

const Edittask = ({ t, i, editTask, updateTask, seteditTask ,darkMode}) => {
  const [newText, setnewtext] = useState(t.text);
  return (
    <div className="bg-slate-800 fixed top-0 bottom-0 left-0 right-0 flex w-full h-full justify-center items-center  bg-opacity-40">
      <div className={`sm:w-1/2 sm:h-1/4 w-10/12  px-5 pb-5 pt-2 p sm:px-10 sm:pt-4 sm:pb-4 bg-opacity-100 ${darkMode?"bg-slate-800":"bg-white"}`}>
        <button
          className="block ml-auto cursor-pointer hover:text-red-500 text-xl transition-all"
          onClick={() => {
            seteditTask(null);
          }}
        >
          <i className="fa-solid fa-circle-xmark "></i>
        </button>
        <div className="flex flex-col">
          <input
            value={newText}
            onChange={(e) => {
              setnewtext(e.target.value);
            }}
            className={`focus:outline-none w-3/4 text-lg border-gray-400 border rounded-md font-medium p-2 m-2 mb-3 ${darkMode?"bg-slate-800":"bg-white"}`}
          ></input>
          <div className="ml-3">
            <button
              onClick={() => {
                seteditTask(null);
              }}
              className={`  border-2 px-4  font-medium mr-2 rounded-sm transition-all   ${darkMode?"border-white text-white hover:bg-white hover:text-black":"border-black text-black hover:bg-black hover:text-white"}`}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                updateTask(i, newText);
              }}
              className="bg-blue-500 px-4 text-white font-medium rounded-sm transition-all hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittask;
// onChange={(e)=>{updateTask(i,e.target.value)}}  w-3/5 h-4/6
