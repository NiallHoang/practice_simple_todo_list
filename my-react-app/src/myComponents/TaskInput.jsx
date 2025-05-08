import React from "react";

function TaskInput({value, onChange, onAdd}) {
  return (
    <div>
      <input
        className="input-task"
        placeholder="Enter a task"
        type="text"
        value={value}
        onChange={onChange}/>

      <button className="add-new-task" onClick={onAdd}>Add</button>
    </div>
  );
};
export default TaskInput;