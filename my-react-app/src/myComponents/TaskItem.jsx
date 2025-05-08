import {React} from "react";

function TaskItem({task, index, onMoveUp, onMoveDown, onDelete}){
    return (
        <li>
          <span className="text">{task}</span>
          <button className="delete-task" onClick={() => onDelete(index)}>
            Delete
          </button>
          <button className="move-btn-up" onClick={() => onMoveUp(index)}>
            ⬆️
          </button>
          <button className="move-btn-down" onClick={() => onMoveDown(index)}>
            ⬇️
          </button>
        </li>
    );
};
export default TaskItem;