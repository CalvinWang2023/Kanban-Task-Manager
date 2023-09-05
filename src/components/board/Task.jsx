import TaskModal from '../../modals/taskModal/TaskModal';
import { useState } from "react";

const Task = ({ task, columnIndex, taskIndex }) => {
    let subTaskCompletedNum = 0;
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const taskModalToggleClick = () => {
        setTaskModalOpen((state) => !state);
    }

    // console.log(`taskModalOpen: ${ taskModalOpen }`);

    return (
        <>
            <div 
                className="card" 
                onClick={ () => taskModalToggleClick(columnIndex, taskIndex) }
            >
                <p className='card-title'>{ task.title }</p> 
                {
                    task.subtasks.map((subtask) => {                 
                        if (subtask.isCompleted === true) {
                            subTaskCompletedNum++
                        }
                    })
                }
                <p className='card-subtask'>{subTaskCompletedNum} of {task.subtasks.length} subtasks</p>
            </div>
            { taskModalOpen && <TaskModal columnIndex={ columnIndex } taskIndex={ taskIndex } setTaskModalOpen={ setTaskModalOpen } /> } 
        </>
    )
}

export default Task