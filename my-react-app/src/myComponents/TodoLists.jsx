import React, {useState, createContext} from "react"
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

function ToDoList() {
    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    };

    function addNewTask(){
        if (newTask!==""){
            setTask(t => [...t, newTask]);
            setNewTask("");
        }
    };

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i)=>i!==index);
        setTask(updatedTasks);
    };

    function moveButtonUp(index){
        if(index>0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    };

    function moveButtonDown(index){
        if(index<tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    };

    return(
        <div>
            <div className="title"><h1>TodoList</h1></div>
            <div>
                <TaskInput value={newTask} onChange={handleInputChange} onAdd={addNewTask} />
            </div>
            <TaskList tasks={tasks} onDelete={deleteTask} onMoveUp={moveButtonUp} onMoveDown={moveButtonDown} />
        </div>
    )
}
export default ToDoList;