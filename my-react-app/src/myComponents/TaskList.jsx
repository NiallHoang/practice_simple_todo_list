import {React} from "react";
import TaskItem from "./TaskItem";

function TaskList({tasks, onDelete, onMoveUp, onMoveDown}){
    return (
        <ol>
        {tasks.map((task, index) => (
            <TaskItem
            key={index}
            task={task}
            index={index}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            />
        ))}
        </ol>
    );
};
export default TaskList;