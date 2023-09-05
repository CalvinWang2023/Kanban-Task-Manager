import { useDispatch, useSelector } from "react-redux";
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import chevronUp from '../../assets/icon-chevron-up.svg';
import chevronDown from '../../assets/icon-chevron-down.svg';
import './TaskModal.css';
import { useState, useRef, useEffect } from "react";
import BoardsSlice from "../../redux/BoardsSlice";
import AddEditTaskModal from '../addEditTaskModal/AddEditTaskModal';
import DeleteModal from "../deleteModal/DeleteModal";

const TaskModal = ({ columnIndex, taskIndex, setTaskModalOpen }) => {
    const dispatch = useDispatch();
    const [addEditTaskModalOpen, setAddEditTaskModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [statusUnfolded, setStatusUnfolded] = useState(true);
    const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);

    const [newStatusIndex, setNewStatusIndex] = useState(columnIndex);

    const ellipsisModalRef = useRef(null);
    const ellipsisImgRef = useRef(null);

    const clickOnOutside = (e) => {
        const element = e.target;

        if (!ellipsisImgRef.current?.contains(element) && !ellipsisModalRef.current?.contains(element)) {
            setIsEllipsisMenuOpen(false);
            document.body.removeEventListener("click", clickOnOutsideRef.current);
        }
    }

    const clickOnOutsideRef = useRef(clickOnOutside);
    
    const ellipsisMenuControl = () => {
        if (isEllipsisMenuOpen === false) {
            document.body.addEventListener("click", clickOnOutsideRef.current);
        } else {
            document.body.removeEventListener("click", clickOnOutsideRef.current);
        }
        setIsEllipsisMenuOpen(!isEllipsisMenuOpen);
    };

    const board = {
        name: activeBoard.columns[columnIndex].tasks[taskIndex].title,
        description: activeBoard.columns[columnIndex].tasks[taskIndex].description,
        status: activeBoard.columns[newStatusIndex].name,
        subtasks: activeBoard.columns[columnIndex].tasks[taskIndex].subtasks
    }

    const completedTasks = board.subtasks.filter((subtask) => subtask.isCompleted === true);
    const completedTasksNum = completedTasks.length;

    const taskModalToggleClick = () => {
        statusChangeClick();
        setTaskModalOpen((state) => !state);
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

    const statusChangeClick = () => {
        if (columnIndex === newStatusIndex) {
            return;
        }
        dispatch(BoardsSlice.actions.setTaskStatus({ boardIndex: activeBoardIndex, 
                                                     columnIndex: columnIndex,
                                                     taskIndex: taskIndex,
                                                     statusIndex: newStatusIndex }));     
    }

    const addEditTaskModalToggleClick = () => {
        setAddEditTaskModalOpen((state) => !state);
        if (isEllipsisMenuOpen === true) {
            ellipsisMenuControl();
        } 
    }

    const deleteModalToggleClick = () => {
        setDeleteModalOpen((state) => !state);
        if (isEllipsisMenuOpen === true) {
            ellipsisMenuControl();
        } 
    }

    const deleteTaskClick = () => {
        setTaskModalOpen((state) => !state);
        setDeleteModalOpen((state) => !state);
        dispatch(BoardsSlice.actions.deleteTask({ boardIndex: activeBoardIndex, 
                                                    columnIndex: columnIndex, 
                                                    taskIndex: taskIndex }));
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
                                    <p>Edit Task</p>
                                </button>
                                <button 
                                    className="delete"
                                    onClick={ deleteModalToggleClick }
                                >
                                    <p>Delete Task</p>
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
                                        onClick={ () => checkboxOnChangeHandler(activeBoardIndex, columnIndex, taskIndex, subtaskIndex, 
                                                                                    !board.subtasks[subtaskIndex].isCompleted
                                                                               ) 
                                                }
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={ board.subtasks[subtaskIndex].isCompleted } 
                                            onChange={ () => checkboxOnChangeHandler(activeBoardIndex, columnIndex, taskIndex, subtaskIndex, 
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
                                        onClick={() => { 
                                                    setNewStatusIndex(statusIndex);
                                                    setStatusUnfolded((state) => !state); 
                                                }}
                                    >
                                        <p>{ column.name }</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            { addEditTaskModalOpen && <AddEditTaskModal type='edit' columnIndex={ columnIndex } taskIndex={ taskIndex } setAddEditTaskModalOpen={ setAddEditTaskModalOpen } /> } 
            { deleteModalOpen && <DeleteModal type='task' columnIndex={ columnIndex } taskIndex={ taskIndex } deleteClick={ deleteTaskClick } setDeleteModalOpen={ setDeleteModalOpen } /> }       
        </div>
    )
}

export default TaskModal