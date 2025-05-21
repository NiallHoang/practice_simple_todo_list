import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../fireBaseconfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, writeBatch } from 'firebase/firestore';

function isValidDate(dateString) {
    // First check if the string matches YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return false;
    }

    // Parse the date components
    const [year, month, day] = dateString.split('-').map(Number);

    // Check if month is between 1-12
    if (month < 1 || month > 12) {
        return false;
    }

    // Create a date object and check if the components match what was provided
    // This handles leap years and days-per-month validation
    const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function TodoList() {
    // Changed component name from ToDoList to TodoList to match file name
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
    const [currentSection, setCurrentSection] = useState("myDay");

    // Add sections for navigation UI
    const sections = [
        { id: "myDay", label: "Today" },
        { id: "thisWeek", label: "This Week" },
        { id: "thisMonth", label: "This Month" },
        { id: "all", label: "All Tasks" }
    ];

    // Load tasks from localStorage on component mount
    // useEffect(() => {
    //     const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    //     storedTasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by due date
    //     setTasks(storedTasks);
    // }, []);

    // Save tasks to localStorage whenever they change
    // useEffect(() => {
    //     localStorage.setItem("tasks", JSON.stringify(tasks));
    // }, [tasks]);
    // useEffect(() => {
    //     const user = auth.currentUser;
    //     if (!user) return;
    //     const q = query(collection(db, "users", user.uid, "tasks"), orderBy("order"));
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         const tasksData = snapshot.docs.map(doc => ({
    //             ...doc.data(),
    //             id: doc.id
    //         }));
    //         setTasks(tasksData);
    //     })
    //     return () => unsubscribe();
    // }, []);
    useEffect(() => {
        let unsubscribeTasks = null;
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(collection(db, "users", user.uid, "tasks"), orderBy("order"));
                unsubscribeTasks = onSnapshot(q, (snapshot) => {
                    const tasksData = snapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }));
                    setTasks(tasksData);
                });
            } else {
                setTasks([]); // Clear tasks if not logged in
            }
        });
        return () => {
            if (unsubscribeTasks) unsubscribeTasks();
            unsubscribeAuth();
        };
    }, []);


    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleDateChange(event) {
        setDueDate(event.target.value);
    }

    // function addNewTask() {
    //     if (newTask.trim() === "" || dueDate === "") {
    //         swal("Error", "Please enter both task and due date!", "error");
    //         return;
    //     }

    //     if(!isValidDate(dueDate)) {
    //         swal("Error", "Please enter a valid due date in the correct format!", "error");
    //         return;
    //     }

    //     const newTaskObj = {
    //         id: Date.now(),
    //         text: newTask,
    //         date: dueDate,
    //         completed: false,
    //     };

    //     setTasks((prevTasks) => {
    //         // Add the new task and sort by date
    //         const updatedTasks = [...prevTasks, newTaskObj];
    //         updatedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    //         return updatedTasks;
    //     });

    //     setNewTask("");
    //     setDueDate(new Date().toISOString().slice(0, 10));
    // }
    async function addNewTask() {
        const user = auth.currentUser;
        if (!user) return;
        if (newTask.trim() === "" || dueDate === "") {
            swal("Error", "Please enter both task and due date!", error);
            return;
        }
        if (!isValidDate(dueDate)) {
            swal("Error", "Please enter both task and due date", error);
            return;
        }
        const maxOrder = tasks.length > 0 ? Math.max(...tasks.map(t => t.order ?? 0)) : 0;
        await addDoc(collection(db, "users", user.uid, "tasks"), { text: newTask, date: dueDate, completed: false, order: maxOrder + 1 });
        setNewTask("");
        setDueDate(new Date().toISOString().slice(0, 10));
    }


    // function deleteTask(taskId) {
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this task!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     }).then((willDelete) => {
    //         if (willDelete) {
    //             setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    //             swal("Task deleted successfully!", { icon: "success" });
    //         }
    //     });
    // }
    async function deleteTask(taskID) {
        const user = auth.currentUser;
        if (!user) return;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                await deleteDoc(doc(db, "users", user.uid, "tasks", taskID));
                swal("Task deleted successfully!", { icon: "success" });
            }
        })
    };

    // function toggleTaskCompletion(taskId) {
    //     setTasks((prevTasks) =>
    //         prevTasks.map((task) =>
    //             task.id === taskId ? { ...task, completed: !task.completed } : task
    //         )
    //     );
    // }
    async function toggleTaskCompletion(taskID, currentCompleted) {
        const user = auth.currentUser;
        if (!user) return;
        await updateDoc(doc(db, "users", user.uid, "tasks", taskID), { completed: !currentCompleted });
    };


    // function updateTaskDate(taskId, newDate) {
    //     if (!isValidDate(newDate)) {
    //         swal("Error", "Please enter a valid due date in the correct format!", "error");
    //         return;
    //     }

    //     const taskToUpdate = tasks.find((task) => task.id === taskId);

    //     if (taskToUpdate) {
    //         swal({
    //             title: "Are you sure?",
    //             text: `Update the due date from ${taskToUpdate.date} to ${newDate}.`,
    //             icon: "info",
    //             buttons: ["Cancel", "Yes"],
    //         }).then((willChangeDate) => {
    //             if (willChangeDate) {
    //                 setTasks(prevTasks => {
    //                     const updatedTasks = prevTasks.map((task) =>
    //                         task.id === taskId ? { ...task, date: newDate } : task
    //                     );
    //                     // Re-sort tasks after updating the date
    //                     updatedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    //                     return updatedTasks;
    //                 });
    //             }
    //         });
    //     }
    // }
    async function updateTaskDate(taskId, newDate) {
        const user = auth.currentUser;
        if (!user) return;
        if (!isValidDate(newDate)) {
            swal("Error", "Please enter a valid due date in the correct format!", "error");
            return;
        }
        await updateDoc(doc(db, "users", user.uid, "tasks", taskId), {
            date: newDate
        });
    }

    // Added functions for moving tasks up and down
    // function moveTaskUp(taskId) {
    //     setTasks(prevTasks => {
    //         const index = prevTasks.findIndex(task => task.id === taskId);
    //         if (index <= 0) return prevTasks; // Can't move up if already at top

    //         const newTasks = [...prevTasks];
    //         [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
    //         return newTasks;
    //     });
    // }

    // function moveTaskDown(taskId) {
    //     setTasks(prevTasks => {
    //         const index = prevTasks.findIndex(task => task.id === taskId);
    //         if (index === -1 || index === prevTasks.length - 1) return prevTasks; // Can't move down if at bottom

    //         const newTasks = [...prevTasks];
    //         [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    //         return newTasks;
    //     });
    // }
    async function moveTaskUp(taskId) {
        const user = auth.currentUser;
        if (!user) return;
        const idx = tasks.findIndex(task => task.id === taskId);
        if (idx <= 0) return;

        const currentTask = tasks[idx];
        const prevTask = tasks[idx - 1];

        // Swap order values in Firestore using a batch
        const batch = writeBatch(db);
        batch.update(doc(db, "users", user.uid, "tasks", currentTask.id), { order: prevTask.order });
        batch.update(doc(db, "users", user.uid, "tasks", prevTask.id), { order: currentTask.order });
        await batch.commit();
    }

    async function moveTaskDown(taskId) {
        const user = auth.currentUser;
        if (!user) return;
        const idx = tasks.findIndex(task => task.id === taskId);
        if (idx === -1 || idx === tasks.length - 1) return;

        const currentTask = tasks[idx];
        const nextTask = tasks[idx + 1];

        // Swap order values in Firestore using a batch
        const batch = writeBatch(db);
        batch.update(doc(db, "users", user.uid, "tasks", currentTask.id), { order: nextTask.order });
        batch.update(doc(db, "users", user.uid, "tasks", nextTask.id), { order: currentTask.order });
        await batch.commit();
    }

    function getFilteredTasks() {
        const today = new Date();
        const todayDate = today.toISOString().slice(0, 10);
        function parseLocalYMD(iso) {
            const [y, m, d] = iso.split("-").map(Number);
            return new Date(y, m - 1, d);
        }

        switch (currentSection) {
            case "myDay":
                return tasks.filter((task) => task.date === todayDate);
            case "thisWeek": {
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                const endOfWeek = new Date(today);
                endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
                return tasks.filter((task) => {
                    const taskDate = new Date(task.date);
                    return taskDate >= startOfWeek && taskDate <= endOfWeek;
                });
            }
            case "thisMonth": {
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                return tasks.filter((task) => {
                    const taskDate = parseLocalYMD(task.date);
                    return taskDate >= startOfMonth && taskDate <= endOfMonth;
                });
            }
            case "all":
            default:
                return tasks;
        }
    }

    const filteredTasks = getFilteredTasks();

    return (
        <div className="todo-container">
            <div className="title">
                <h1>TodoList</h1>
            </div>

            <div className="sections">
                {sections.map(section => (
                    <button
                        key={section.id}
                        className={currentSection === section.id ? "active" : ""}
                        onClick={() => setCurrentSection(section.id)}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            <div>
                <TaskInput
                    value={newTask}
                    onChange={handleInputChange}
                    onDateChange={handleDateChange}
                    onAdd={addNewTask}
                    dueDate={dueDate}
                    onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                />
            </div>

            <h2>{sections.find(s => s.id === currentSection)?.label || "Tasks"}</h2>

            <TaskList
                tasks={filteredTasks}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
                onUpdateDate={updateTaskDate}
                onMoveUp={moveTaskUp}
                onMoveDown={moveTaskDown}
            />

            {filteredTasks.length === 0 && (
                <p className="empty-message">No tasks in this section.</p>
            )}

            <div className="stats">
                <p>Total: {filteredTasks.length} | Completed: {filteredTasks.filter(t => t.completed).length}</p>
            </div>
        </div>
    );
}

export default TodoList;