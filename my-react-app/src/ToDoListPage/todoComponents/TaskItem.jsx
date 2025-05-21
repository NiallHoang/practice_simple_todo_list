import React from "react"; // Fixed import statement

function TaskItem({ task, onDelete, onToggleComplete, onUpdateDate, onMoveUp, onMoveDown }) {
    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);
        return date.toDateString() === today.toDateString();
    };
    
    // Fixed to handle the complete task object instead of just text
    return (
        <li className={task.completed ? "completed-task" : "task-item"}>
            <div className="task-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
                <p
                    className={`task-date ${isToday(task.date) ? "today" : ""}`}
                    onClick={() => {
                        const newDate = prompt("Enter new due date (YYYY-MM-DD):", task.date);
                        if (newDate && newDate.trim() !== "") {
                            onUpdateDate(task.id, newDate);
                        }
                    }}
                >
                    {isToday(task.date) ? "Today" : task.date}
                </p>
            </div>
            <div className="task-controls">
                <button className="move-btn-up" onClick={() => onMoveUp(task.id)} title="Move Up">
                    ⬆️
                </button>
                <button className="move-btn-down" onClick={() => onMoveDown(task.id)} title="Move Down">
                    ⬇️
                </button>
                <button className="delete-btn" onClick={() => onDelete(task.id)} title="Delete">
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default TaskItem;
