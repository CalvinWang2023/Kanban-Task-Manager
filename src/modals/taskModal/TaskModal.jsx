import TaskModalToggleSlice from "../../redux/TaskModalToggleSlice";
import { useDispatch, useSelector } from "react-redux";
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import chevronUp from '../../assets/icon-chevron-up.svg';
import chevronDown from '../../assets/icon-chevron-down.svg';
import './TaskModal.css';
import { useState, useRef, useEffect } from "react";
import BoardsSlice from "../../redux/BoardsSlice";
import AddEditTaskModalToggleSlice from "../../redux/AddEditTaskModalToggleSlice";
import AddEditTaskModalTypeSlice from "../../redux/AddEditTaskModalTypeSlice";
import DeleteModalToggleSlice from "../../redux/DeleteModalToggleSlice";
import DeleteModalTypeSlice from "../../redux/DeleteModalTypeSlice";

const TaskModal = ({ currentColumnIndex, currentTaskIndex }) => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [statusUnfolded, setStatusUnfolded] = useState(true);
    const [columnIndex, setColumnIndex] = useState(currentColumnIndex);
    const [taskIndex, setTaskIndex] = useState(currentTaskIndex);
    const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);

    const ellipsisModalRef = useRef(null);
    const ellipsisImgRef = useRef(null);

    const clickOnOutside = (e) => {
        const element = e.target;

        if (!ellipsisImgRef.current?.contains(element) && !ellipsisModalRef.current?.contains(element)) {
            e.preventDefault();
            e.stopPropagation();
            setIsEllipsisMenuOpen(false);
        }
    }

    const ellipsisMenuControl = () => {
        if (isEllipsisMenuOpen === false) {
            document.body.addEventListener("click", clickOnOutside);
        } else {
            document.body.removeEventListener("click", clickOnOutside);
        }
        setIsEllipsisMenuOpen(!isEllipsisMenuOpen);
    };

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
        if (isEllipsisMenuOpen === true) {
            ellipsisMenuControl();
        }
    }

    const checkboxOnChangeHandler = (boardIndex, columnIndex, taskIndex, subtaskIndex, isCompleted) => {
        dispatch(BoardsSlice.actions.setSubtaskIsCompleted({ boardIndex: boardIndex, 
                                                                columnIndex: columnIndex,
                                                                taskIndex: taskIndex,
                                                                subtaskIndex: subtaskIndex,
                                                                isCompleted: isCompleted }));
    }

    const statusChangeClick = (boardIndex, columnIndex, taskIndex, statusIndex) => {
        setStatusUnfolded(!statusUnfolded);
        dispatch(BoardsSlice.actions.setTaskStatus({ boardIndex: boardIndex, 
                                                        columnIndex: columnIndex,
                                                        taskIndex: taskIndex,
                                                        statusIndex: statusIndex })); 
        setColumnIndex(statusIndex);
        setTaskIndex(activeBoard.columns[statusIndex].tasks.length);      
    }

    const addEditTaskModalToggleClick = () => {
        taskModalToggleClick();
        dispatch(AddEditTaskModalToggleSlice.actions.toggleAddEditTaskModal());
        dispatch(AddEditTaskModalTypeSlice.actions.changeEditType());
    }

    const deleteModalToggleClick = () => {
        taskModalToggleClick();
        dispatch(DeleteModalToggleSlice.actions.toggledeleteModal());
        dispatch(DeleteModalTypeSlice.actions.changeTaskType());
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
                    <div className="ellipsis" ref={ellipsisImgRef}>
                        <button 
                            className="ellipsis-button"
                            onClick={ ellipsisMenuControl }
                        >
                            <img 
                                src={ ellipsis } 
                                alt="ellipsis icon" 
                            />
                        </button>

                        {
                            isEllipsisMenuOpen &&
                            <div className="ellipsis-menu" ref={ellipsisModalRef}>
                                <button 
                                    className="edit"
                                    onClick={ addEditTaskModalToggleClick }
                                >
                                    <p>Edit Board</p>
                                </button>
                                <button 
                                    className="delete"
                                    onClick={ deleteModalToggleClick }
                                >
                                    <p>Delete Board</p>
                                </button>
                            </div>
                        }
                    </div>
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