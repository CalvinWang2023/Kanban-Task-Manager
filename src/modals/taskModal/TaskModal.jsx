import TaskModalToggleSlice from "../../redux/TaskModalToggleSlice";
import { useDispatch, useSelector } from "react-redux";
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import chevronUp from '../../assets/icon-chevron-up.svg';
import chevronDown from '../../assets/icon-chevron-down.svg';
import './TaskModal.css';
import { useState } from "react";
import { useEffect } from "react";
import BoardsSlice from "../../redux/BoardsSlice";

const TaskModal = ({ columnIndex, taskIndex }) => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [statusUnfolded, setStatusUnfolded] = useState(true);

    const board = {
        name: activeBoard.columns[columnIndex].tasks[taskIndex].title,
        description: activeBoard.columns[columnIndex].tasks[taskIndex].description,
        status: activeBoard.columns[columnIndex].name,
        subtasks: activeBoard.columns[columnIndex].tasks[taskIndex].subtasks
    }


    const completedTasks = board.subtasks.filter((subtask) => subtask.isCompleted === true);
    const completedTasksNum = completedTasks.length;

    const taskModalToggleClick = () => {
        dispatch(TaskModalToggleSlice.actions.toggleTaskModal());
    }

    const checkboxOnChangeHandler = (boardIndex, columnIndex, taskIndex, subtaskIndex, isCompleted) => {
        dispatch(BoardsSlice.actions.setSubtaskIsCompleted({ boardIndex: boardIndex, 
                                                columnIndex: columnIndex,
                                                taskIndex: taskIndex,
                                                subtaskIndex: subtaskIndex,
                                                isCompleted: isCompleted }));
    }

    const statusChangeClick = (boardIndex, columnIndex, taskIndex, statusIndex) => {
         dispatch(BoardsSlice.actions.setTaskStatus({ boardIndex: boardIndex, 
                                                columnIndex: columnIndex,
                                                taskIndex: taskIndex,
                                                statusIndex: statusIndex }));       
    }

    useEffect(() => {
        setCompletedTasksCount(completedTasksNum);
    }, [completedTasksNum]);

    return (
        <div 
            className="task-modal-container dimmed"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                taskModalToggleClick();
            }}
        >
            <div className="modal">
                <div className="task-header">
                    <h1>{ board.name }</h1>
                    <img src={ ellipsis } alt="ellipsis icon" />
                </div>
                <div className="description">
                    <p>{ board.description }</p>
                </div>
                <div className="subtasks">
                    <p className="subtask-title">
                        { `Subtasks (${ completedTasksCount } of ${ board.subtasks.length })` } 
                    </p>
                    <div className="subtask-list">
                        {
                            board.subtasks.map((subtask, subtaskIndex) => {
                                return (
                                    <div 
                                        key={ subtaskIndex }
                                        className="subtask"
                                        onClick={ () => checkboxOnChangeHandler(activeBoardIndex, 
                                                                                    columnIndex, 
                                                                                    taskIndex, 
                                                                                    subtaskIndex, 
                                                                                    !board.subtasks[subtaskIndex].isCompleted
                                                                                ) 
                                                }
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={ board.subtasks[subtaskIndex].isCompleted } 
                                            onChange={ () => checkboxOnChangeHandler(activeBoardIndex, 
                                                                                        columnIndex, 
                                                                                        taskIndex, 
                                                                                        subtaskIndex, 
                                                                                        !board.subtasks[subtaskIndex].isCompleted
                                                                                    ) 
                                                     }
                                        />
                                        <p className={board.subtasks[subtaskIndex].isCompleted ? 'checked' : 'unchecked'}>
                                            { subtask.title }
                                        </p>
                                    </div>           
                                )
                            })
                        }
                    </div>
                </div>
                <div className="status">
                    <p className="status-title">Current Status</p>
                    <div 
                        className="status-content"
                        onClick={ () => setStatusUnfolded(!statusUnfolded) }
                    >
                        <p>{ board.status }</p>
                        <img 
                            src={ statusUnfolded ? chevronDown : chevronUp } 
                            alt="status list" 
                        />
                    </div>
                    <ul>
                            {
                                !statusUnfolded &&
                                activeBoard.columns.map((column, statusIndex) => {
                                    return (
                                        <li 
                                            key={ statusIndex }
                                            onClick={() => statusChangeClick(activeBoardIndex, columnIndex, taskIndex, statusIndex)}
                                        >
                                            <p>{ column.name }</p>
                                        </li>
                                    )
                                })
                            }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TaskModal