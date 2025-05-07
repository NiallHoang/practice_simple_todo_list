import React, {useState} from "react"

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
                <input className="input-task" placeholder="Enter a task" type="text" value={newTask} onChange={handleInputChange}></input>
                <button className="add-new-task" onClick={addNewTask}>Add</button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                        <li key={index}>
                            <span className="text">{task}</span>
                            <button className="delete-task" onClick={() => deleteTask(index)}>Delete</button>
                            <button className="move-btn-up" onClick={() => moveButtonUp(index)}>⬆️</button>
                            <button className="move-btn-down" onClick={() => moveButtonDown(index)}>⬇️</button>
                        </li>)}
            </ol>
        </div>
    )
}
export default ToDoList;

// import React, { useState } from 'react'

// function ToDoList(){

//     const [tasks, setTasks] = useState([]);
//     const [newTask, setNewTask] = useState("");

//     function handleInputChange(event){
//         setNewTask(event.target.value);
//     }

//     function addTask(){
//         if(newTask.trim() !== ""){
//             setTasks(t => [...t, newTask]);
//             setNewTask("");
//         }
//     }

//     function deleteTask(index){
//         const updatedTasks = tasks.filter((_, i) => i !== index);
//         setTasks(updatedTasks);
//     }

//     function moveTaskUp(index){

//         if(index > 0){
//             const updatedTasks = [...tasks];
//             [updatedTasks[index], updatedTasks[index - 1]] = 
//             [updatedTasks[index - 1], updatedTasks[index]];
//             setTasks(updatedTasks);
//         }
//     }

//     function moveTaskDown(index){

//         if(index < tasks.length - 1){
//             const updatedTasks = [...tasks];
//             [updatedTasks[index], updatedTasks[index + 1]] = 
//             [updatedTasks[index + 1], updatedTasks[index]];
//             setTasks(updatedTasks);
//         }
//     }

//     return(
//     <div className="to-do-list">

//         <h1>To-Do-List</h1>

//         <div>
//             <input
//                 type="text"
//                 placeholder="Enter a task..."
//                 value={newTask}
//                 onChange={handleInputChange}/>
//             <button
//                 className="add-button"
//                 onClick={addTask}>
//                 Add
//             </button>
//         </div>
//         <ol>
//             {tasks.map((task, index) => 
//                 <li key={index}>
//                     <span className="text">{task}</span>
//                     <button
//                         className="delete-button"
//                         onClick={() => deleteTask(index)}>
//                         Delete
//                     </button>
//                     <button
//                         className="move-button"
//                         onClick={() => moveTaskUp(index)}>
//                         ☝
//                     </button>
//                     <button
//                         className="move-button"
//                         onClick={() => moveTaskDown(index)}>
//                         👇
//                     </button> 
//                 </li>
//             )}
//         </ol>
//     </div>);
// }
// export default ToDoList