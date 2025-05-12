import React from "react";

function TaskInput({ value, onChange, onDateChange, onAdd, dueDate, onKeyPress }) {
    return (
        <div className="task-input">
            <input
                type="text"
                placeholder="Add a new task"
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress} // Added to allow Enter key submission
                className="task-text-input"
            />
            <input
                type="date"
                value={dueDate}
                onChange={onDateChange}
                className="task-date-input"
            />
            <button onClick={onAdd} className="add-button">Add Task</button>
        </div>
    );
}

export default TaskInput;