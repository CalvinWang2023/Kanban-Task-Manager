import { useDispatch, useSelector } from 'react-redux';
import './Board.css';
import Sidebar from '../sidebar/Sidebar';
import AddEditBoardModal from "../../modals/addEditBoardModal/AddEditBoardModal";
import TaskModal from '../../modals/taskModal/TaskModal';
import AddEditTaskModal from '../../modals/addEditTaskModal/AddEditTaskModal';
import BoardModalToggleSlice from "../../redux/BoardModalToggleSlice";
import TaskModalToggleSlice from '../../redux/TaskModalToggleSlice';
import BoardModalTypeSlice from "../../redux/BoardModalTypeSlice";
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Board = () => {
    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
    const sidebarToggle = useSelector((state) => state.sidebarToggle);
    const boardModalToggle = useSelector((state) => state.boardModalToggle);
    const taskModalToggle = useSelector((state) => state.taskModalToggle);
    const AddEditTaskModalToggle = useSelector((state) => state.addEditTaskModalToggle);
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const boardModalType = useSelector((state) => state.boardModalType);
    const addEditTaskModalType = useSelector((state) => state.addEditTaskModalType);
    const activeBoard = boards[activeBoardIndex];
    const [columnIndex, setColumnIndex] = useState();
    const [taskIndex, setTaskIndex] = useState();
    const dispatch = useDispatch();

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
                                    <p className='status'>{column.name} ({column.tasks.length})</p>
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

            { boardModalToggle && (<AddEditBoardModal type={ boardModalType } />) }
            { taskModalToggle && <TaskModal currentColumnIndex={ columnIndex } currentTaskIndex={ taskIndex } /> }
            { AddEditTaskModalToggle && <AddEditTaskModal type={ addEditTaskModalType } columnIndex={ columnIndex } taskIndex={ taskIndex }  /> } 
        </>
    )
}

export default Board