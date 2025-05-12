import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggleComplete, onUpdateDate, onMoveUp, onMoveDown }) {
    return (
        <ul className="task-list">
            {tasks.length === 0 ? (
                <li className="empty-list">No tasks available</li>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onToggleComplete={onToggleComplete}
                        onUpdateDate={onUpdateDate}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                    />
                ))
            )}
        </ul>
    );
}

export default TaskList;