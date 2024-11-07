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

  // Form submit method
  const submitForm = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const updatedTaskList = [...taskList, { text: task, status: false }];
      // move the completed task to bottom
      const sortedTaskList = updatedTaskList.sort(
        (a, b) => a.status - b.status
      );
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
    const updatedTaskList = taskList.map((t, i) =>
      i === index ? { ...t, status: !t.status } : t
    );

    // move the completed task to bottom
    const sortedTaskList = updatedTaskList.sort((a, b) => a.status - b.status);
    settaskList(sortedTaskList);
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

  const color="#63E6BE"
  // Delete the Task
  const deleteTask = (i) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(i, 1);
    settaskList(updatedTaskList);
  };

  return (
    <div
      className={` bg-blue-50 flex items-center w-screen h-screen justify-center p-4 sm:p-10 `}
    >
      <div className="bg-white rounded-3xl xl:p-10 w-full sm:w-11/12 p-5 lg:w-9/12  min-h-5/6 h-5/6 flex flex-col shadow-xl lg:px-40 md:px-20 sm:px-10 xl:px-56">
        <h1 className="sm:text-5xl text-4xl font-bold text-blue-950 sm:mb-10 mb-5">
          Daily To Do List
        </h1>
        <form
          onSubmit={submitForm}
          className="flex border h-12 sm:h-14 border-gray-200 rounded-md font-medium justify-between p-1 mb-"
        >
          <input
            placeholder="Add new list item"
            className="text-md font-normal text-gray-300 outline-none focus:text-black w-3/4 ml-4 sm:mt-2 my-2"
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
            <p className="text-lg font-medium ml-3 transition-all mt-4">
              No tasks yet
            </p>
          ) : (
            <ul>
              {taskList.map((t, i) => (
                <li
                  key={i}
                  className={`flex transition-all duration-500 ${
                    t.status ? "opacity-50" : "opacity-100"
                  } m-4 text-lg`}
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
                      t.status ? "line-through text-gray-600" : ""
                    } hover:text-blue-600 transition-all font-medium flex-grow`}
                  >
                    {t.text}
                  </span>
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
            />
          )}
        </div>
      </div>
    </div>
  );
}
