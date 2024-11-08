"use client";
import Image from "next/image";
import { useState } from "react";
import EditTask from "./EditTask";
import { useEffect } from "react";
import ClearAll from "./ClearAll";

export default function Home() {
  const [task, settask] = useState("");
  const [taskList, settaskList] = useState([]);
  const [editTask, seteditTask] = useState(null);
  const [clearAll, setclearAll] = useState(false);
  const [darkMode, setdarkMode] = useState(false);

  // Form submit method
  const submitForm = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const updatedTaskList = [
        ...taskList,
        { text: task, status: false, priority: 1 },
      ];
      // move the completed task to bottom
      const sortedTaskList = updatedTaskList.sort((a, b) => {
        if (a.status !== b.status) return a.status - b.status;
        return a.priority - b.priority;
      });
      settaskList(sortedTaskList);
      settask("");
    }
  };

  // Clear All task
  const clearTask = () => {
    settaskList([]);
    setclearAll(false);
  };

  // Task completed function
  const taskCompleted = (index) => {
    const updatedTaskList = taskList
      .map((t, i) => (i === index ? { ...t, status: !t.status } : t))
      .sort((a, b) => {
        if (a.status !== b.status) return a.status - b.status;
        return b.priority - a.priority;
      });
    settaskList(updatedTaskList);
  };

  // Update the task
  const updateTask = (index, newText) => {
    const updatedTaskList = taskList.map((t, i) => {
      return i === index ? { ...t, text: newText } : t;
    });
    settaskList(updatedTaskList);
    seteditTask(null);
  };

  // Setting the local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    settaskList(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const color = "#63E6BE";
  // Delete the Task
  const deleteTask = (i) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(i, 1);
    settaskList(updatedTaskList);
  };

  // Update Priority
  const updatePriority = (index) => {
    const updatedList = taskList.map((t, i) =>
      i === index ? { ...t, priority: t.priority === 1 ? 2 : 1 } : t
    );
    updatedList.sort((a, b) => {
      if (a.status !== b.status) return a.status - b.status;
      return b.priority - a.priority;
    });
    settaskList(updatedList);
  };
  const darkModeColor="#172437";

  return (
    <div
      className={` flex items-center w-screen bg-blue-50 h-screen justify-center p-4 sm:p-10`} style={{ backgroundColor: darkMode ? "#172437" : "" }}

    >
      <div className={` rounded-3xl xl:p-10 w-full sm:w-11/12 p-5 lg:w-9/12  min-h-5/6 h-5/6 flex flex-col shadow-xl lg:px-40 md:px-20 sm:px-10 xl:px-56 ${darkMode?"bg-slate-800":"bg-white"}`}>
        <div className="ml-auto block">
          <button
            onClick={() => {
              setdarkMode(!darkMode);
            }}
            className={`  rounded-full px-3 py-2 transition-all ${darkMode?"bg-white ":"bg-blue-950"}`}
          >
            <i
              className={
                ` fa-regular text-xl transition-all ${darkMode?"fa-sun text-blue-950":"fa-moon text-white"}
              ` }
            >
             
            </i>
          </button>
        </div>
        <h1 className={`sm:text-5xl text-4xl font-bold  sm:mb-10 mb-5 ${darkMode?"text-white":"text-blue-950"}`}>
          Daily To Do List
        </h1>
        <form
          onSubmit={submitForm}
          className="flex border h-12 sm:h-14 border-gray-200 rounded-md font-medium justify-between p-1 mb-2"
        >
          <input
            placeholder="Add new list item"
            className={`text-md font-normal text-gray-300 outline-none focus:text-black w-3/4 ml-4 sm:mt-2 my-2 ${darkMode?"text-white bg-slate-800 focus:text-white":""}`}
            value={task}
            onChange={(e) => {
              settask(e.target.value);
            }}
          ></input>
          <button
            className="bg-blue-600 p-2 sm:px-8 px-5 text-white text-lg rounded-md hover:bg-blue-700 transition-all"
            onClick={submitForm}
          >
            Add
          </button>
        </form>
        <div className="mb-4 flex-grow overflow-y-auto">
          {taskList.length === 0 ? (
            <p className={`text-lg font-medium ml-3 transition-all mt-4  ${darkMode?"text-white":"text-black"}`}>
              No tasks yet
            </p>
          ) : (
            <ul>
              {taskList.map((t, i) => (
                <li
                  key={i}
                  className={`flex transition-all duration-500 ${
                    t.status ? "opacity-50" : "opacity-100"
                  } m-4 text-lg ${darkMode?"text-white":"text-black"}`}
                >
                  <button onClick={() => taskCompleted(i)}>
                    <i
                      className={
                        t.status
                          ? "fa-solid fa-circle-check mr-4 text-2xl"
                          : "fa-regular fa-circle mr-4 text-2xl"
                      }
                      style={{ color: t.status ? `${color}` : "inherit" }}
                    ></i>
                  </button>
                  <span
                    className={`text-xl sm:text-2xl pb-3 ${
                      t.status ? "line-through text-slate-400" : ""
                    } hover:text-blue-600 transition-all font-medium flex-grow`}
                  >
                    {t.text}
                  </span>
                  {t.status === false && (
                    <button
                      onClick={() => {
                        updatePriority(i);
                      }}
                    >
                      <i
                        className={`mr-2 transition-all ${
                          t.priority === 1
                            ? "fa-regular fa-star"
                            : "fa-solid fa-star"
                        }`}
                        style={{
                          color: t.priority === 2 ? "#FFD43B" : "inherit",
                        }}
                      ></i>
                    </button>
                  )}
                  {t.status === false && (
                    <button
                      onClick={() => {
                        seteditTask(i);
                      }}
                    >
                      <i className="fa-solid fa-pen mr-1 hover:text-blue-600 transition-all"></i>
                    </button>
                  )}

                  <i
                    className="fa-solid fa-trash-can ml-2 pt-3 hover:text-red-500 transition-all"
                    onClick={() => {
                      deleteTask(i);
                    }}
                  ></i>
                  {editTask === i && (
                    <EditTask
                      t={t}
                      i={i}
                      editTask={editTask}
                      updateTask={updateTask}
                      seteditTask={seteditTask}
                      darkMode={darkMode}
                      setdarkMode={setdarkMode}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <hr></hr>
        <div className="flex justify-between w-full pt-5 pb-1">
          <p className="text-gray-400">{taskList.length} items</p>
          <button
            className="border-none text-gray-400 hover:text-gray-500 transition-all font-medium"
            onClick={() => setclearAll(!clearAll)}
          >
            Clear All
          </button>

          {clearAll && (
            <ClearAll
              clearTask={clearTask}
              setclearAll={setclearAll}
              clearAll={clearAll}
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
