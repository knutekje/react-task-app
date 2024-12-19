import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";

interface Task {
    id: string;
    title: string;
}

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get<Task[]>("/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    // Submit a new task to the backend
    const submitTask = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!newTask.trim()) return;

        try {
            await axios.post("/api/tasks", { title: newTask });
            setNewTask(""); // Clear the input field
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>Task Manager</h1>

            {/* Task Submission Form */}
            <form onSubmit={submitTask}>
                <div>
                    <label htmlFor="title">Task Title:</label>
                    <input
                        id="title"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter task title"
                        required
                        style={{
                            marginLeft: "10px",
                            padding: "5px",
                            fontSize: "16px",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        marginTop: "10px",
                        padding: "5px 10px",
                        fontSize: "16px",
                    }}
                >
                    Add Task
                </button>
            </form>

            <hr />

            {/* Task List */}
            <h2>Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: "0" }}>
                    {tasks.map((task) => (
                        <li key={task.id} style={{ marginBottom: "10px" }}>
                            {task.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskManager;
