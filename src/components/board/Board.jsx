import { useDispatch, useSelector } from 'react-redux';
import './Board.css';
import AddEditBoardModal from "../../modals/addEditBoardModal/AddEditBoardModal";
import TaskModal from '../../modals/taskModal/TaskModal';
import AddEditTaskModal from '../../modals/addEditTaskModal/AddEditTaskModal';
import BoardModalToggleSlice from "../../redux/BoardModalToggleSlice";
import TaskModalToggleSlice from '../../redux/TaskModalToggleSlice';
import BoardModalTypeSlice from "../../redux/BoardModalTypeSlice";
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { useState } from 'react';

const Board = () => {
    const sidebarToggle = useSelector((state) => state.sidebarToggle);
    const boardModalToggle = useSelector((state) => state.boardModalToggle);
    const taskModalToggle = useSelector((state) => state.taskModalToggle);
    const AddEditTaskModalToggle = useSelector((state) => state.addEditTaskModalToggle);
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const boardModalType = useSelector((state) => state.boardModalType);
    const addEditTaskModalType = useSelector((state) => state.addEditTaskModalType);
    const deleteModalToggle = useSelector((state) => state.deleteModalToggle);
    const deleteModalType = useSelector((state) => state.deleteModalType);
    const activeBoard = boards[activeBoardIndex];
    const [columnIndex, setColumnIndex] = useState();
    const [taskIndex, setTaskIndex] = useState();
    const dispatch = useDispatch();

    const statusColors = [
        "#33FFD8", // Teal 
        "#FFFF33", // Yellow
        "#FF33A6", // Pink
        "#A033FF", // Purple 
        "#33FF77", // Green
        "#FFA733", // Orange
        "#FF5733", // Red
        "#3388FF" // Blue
    ];

    const boardModalToggleClick = () => {
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
        dispatch(BoardModalTypeSlice.actions.changeEditType());
    }

    const taskModalToggleClick = (columnIndex, taskIndex) => {
        dispatch(TaskModalToggleSlice.actions.toggleTaskModal());
        setColumnIndex(columnIndex);
        setTaskIndex(taskIndex);
    }

    return (
        <>
            <div className={sidebarToggle ? 'board-container full-screen' : 'board-container' }>
                <ul className='board'>
                    {
                        activeBoard.columns.map((column, columnIndex) => {
                            return (
                                <li key={ columnIndex }>
                                    <div className="status">
                                        <span className="status-color" style={{backgroundColor: statusColors[columnIndex % 8]}}></span>
                                        <p className='status-text'>{column.name} ({column.tasks.length})</p>
                                    </div>
                                    {
                                        column.tasks.map((task, taskIndex) => { 
                                            let subTaskCompletedNum = 0;  
                                            return (
                                                <div 
                                                    className="card" 
                                                    key={ taskIndex }
                                                    onClick={ () => taskModalToggleClick(columnIndex, taskIndex) }
                                                >
                                                    <p className='title'>{ task.title }</p> 
                                                    {
                                                        task.subtasks.map((subtask) => {                 
                                                            if (subtask.isCompleted === true) {
                                                                subTaskCompletedNum++;
                                                            }
                                                        })
                                                    }
                                                    <p className='subtask'>{subTaskCompletedNum} of {task.subtasks.length} subtasks</p>
                                                </div>
                                            )
                                        }) 
                                    }
                                </li>
                            )
                        })
                    }
                    
                    <li>
                        <p className='status add-new-col'>Add New Column</p>
                        <button onClick={ boardModalToggleClick }>
                            <h2>+ New Column</h2>
                        </button>
                    </li>
                </ul>
            </div>

            { boardModalToggle && <AddEditBoardModal type={ boardModalType } /> }
            { taskModalToggle && <TaskModal currentColumnIndex={ columnIndex } currentTaskIndex={ taskIndex } /> }
            { AddEditTaskModalToggle && <AddEditTaskModal type={ addEditTaskModalType } columnIndex={ columnIndex } taskIndex={ taskIndex }  /> } 
            { deleteModalToggle && <DeleteModal type={ deleteModalType } columnIndex={ columnIndex } taskIndex={ taskIndex } /> }
        </>
    )
}

export default Board
