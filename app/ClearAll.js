import React from "react";

const ClearAll = ({ clearTask, setclearAll, clearAll,darkMode }) => {
  return (
    <div className="bg-slate-500 fixed top-0 bottom-0 left-0 right-0 flex w-full h-full justify-center items-center  bg-opacity-40">
      <div className={`sm:w-1/2 sm:h-1/4 w-10/12 px-5 pb-5 pt-2 p sm:px-10 sm:pt-4 sm:pb-4 flex flex-col items-center justify-center ${darkMode?"bg-slate-800":"bg-white"}`}>
        <h1 className={`sm:text-xl text-lg font-medium mb-4 ${darkMode?"text-white":"text-black"}`}>
          Do you want all the tasks to be deleted?
        </h1>
        <div>
          <button
            onClick={() => {
              setclearAll(!clearAll);
            }}
            className={`  border-2 px-4  font-medium mr-2 rounded-sm transition-all 
              ${darkMode?"text-white border-white hover:bg-white hover:text-black":"text-black border-black hover:bg-black hover:text-white"}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              clearTask();
            }}
            className="bg-blue-500 px-4 text-white font-medium rounded-sm transition-all hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearAll;
