import React, { useEffect, useState } from 'react'
import Task from './Task';
import { API } from '../global';

const TaskList = () => {
    const [task,setTask] = useState([]);

    const getTasks = () =>{
        fetch(`${API}/get`,{
            method:"GET",
            headers:{"backend-token":localStorage['storetoken']}
        })
        .then((data)=>data.json())
        .then((tsk)=>setTask(tsk));
    }

    useEffect(()=>{
        getTasks();
    },[]);

  return (
    <div className="task-list">
        {
            task.map((list,index)=>(
                <div key={index}>
                    <Task getTasks={getTasks} tasks={list}/>
                </div>
            ))
        }
    </div>
  )
}

export default TaskList
