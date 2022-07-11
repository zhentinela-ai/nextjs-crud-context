import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useRouter } from "next/router";

const TaskFormPage = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const { createTask, updateTask, tasks } = useTasks();
  const { push, query } = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.id) {
      createTask(task.title, task.description);
    } else {
      updateTask(query.id, task);
    }

    push("/");
  };

  useEffect(() => {
    if (query.id) {
      const taskFound = tasks.find((task) => task.id === query.id);
      console.log(taskFound);
      setTask({ title: taskFound.title, description: taskFound.description });
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4">
          <h1 className="mb-7 text-3xl">
            {query.id ? "Update a Task" : "Create a Task"}
          </h1>

          <input
            type="text"
            name="title"
            placeholder="Write a title"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            onChange={handleChange}
            value={task.title}
          />

          <textarea
            rows="2"
            name="description"
            placeholder="Write a description"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            onChange={handleChange}
            value={task.description}
          ></textarea>

          <button
            className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg disabled:opacity-30"
            disabled={!task.title}
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TaskFormPage;
