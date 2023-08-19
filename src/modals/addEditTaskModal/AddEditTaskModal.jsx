import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddEditTaskModalToggleSlice from "../../redux/AddEditTaskModalToggleSlice";
import BoardsSlice from "../../redux/BoardsSlice";
import cross from '../../assets/icon-cross.svg';
import chevronUp from '../../assets/icon-chevron-up.svg';
import chevronDown from '../../assets/icon-chevron-down.svg';
import './AddEditTaskModal.css';

const AddEditTaskModal = ({ type, columnIndex, taskIndex }) => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];
    
    const placeholders = ['e.g. Make coffee', 'e.g. Drink coffee & smile', 'Your subtask title...'];
    const [statusUnfolded, setStatusUnfolded] = useState(true);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [subtasks, setSubtasks] = useState([{ title: '', isCompleted: false }, { title: '', isCompleted: false }]);
    const [statusIndex, setStatusIndex] = useState(0);

    const addEditTaskModalToggleClick = () => {
        dispatch(AddEditTaskModalToggleSlice.actions.toggleAddEditTaskModal());
    }

    const statusChangeClick = (boardIndex, columnIndex, taskIndex, statusIndex) => {
        dispatch(BoardsSlice.actions.setTaskStatus({ boardIndex: boardIndex, 
                                                        columnIndex: columnIndex,
                                                        taskIndex: taskIndex,
                                                        statusIndex: statusIndex }));     
    }

    const createTaskClick = () => {
        addEditTaskModalToggleClick();
        const newSubtasks = subtasks.filter((subtask) => subtask.title !== '');

        dispatch(BoardsSlice.actions.addTask({ boardIndex: activeBoardIndex, 
                                                columnIndex: statusIndex,
                                                title: taskName,
                                                description: taskDescription,
                                                status: activeBoard.columns[statusIndex].name,
                                                newSubtasks: newSubtasks }))
    }

    const editTaskClick = () => {
        addEditTaskModalToggleClick();
        const newSubtasks = subtasks.filter((subtask) => subtask.title !== '');
        dispatch(BoardsSlice.actions.editTask({ boardIndex: activeBoardIndex, 
                    columnIndex: columnIndex,
                    taskIndex: taskIndex,
                    title: taskName,
                    description: taskDescription,
                    status: activeBoard.columns[statusIndex].name,
                    subtasks: newSubtasks }));
        statusChangeClick(activeBoardIndex, columnIndex, taskIndex, statusIndex);
    }

    const createSubtaskClick = () => {
        setSubtasks((prevSubtasks) => {
            const newSubtasks = [...prevSubtasks, { title: '', isCompleted: false }];
            return newSubtasks;
        })
    }

    const cancelSubtaskClick = (index) => {
        setSubtasks((prevSubtasks) => {
            const newSubtasks = [...prevSubtasks];
            newSubtasks.splice(index, 1);
            return newSubtasks;
        })
    }

    useEffect(() => {
        if (type === 'edit') {
            const activeColumn = activeBoard.columns[columnIndex];
            const activeTask = activeColumn.tasks[taskIndex];
            setTaskName(activeTask.title);
            setTaskDescription(activeTask.description);
            setSubtasks(activeTask.subtasks);
            setStatusIndex(columnIndex);
        }
    }, []);

    return (
        <div 
            className="addedit-task-modal-container dimmed"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                addEditTaskModalToggleClick();
            }}
        >
            <div className="modal">
                <div className="title">
                    <h1>{ type === 'add' ? 'Add New Task' : "Edit Task" }</h1>
                </div>
                <div className='task-name-input'>
                    <label htmlFor="task-name">Title</label>
                    <input 
                        type="text" 
                        id="task-name" 
                        name="task-name" 
                        placeholder='e.g. Take Coffee break'
                        value={ taskName }
                        onChange={ (e) => setTaskName(e.target.value) } 
                    />                    
                </div>
                <div className='task-description-input'>
                    <label htmlFor="task-description">Description</label>
                    <textarea
                        rows={5} 
                        type="text" 
                        id="task-description" 
                        name="task-description" 
                        placeholder="e.g. Remember to take a coffee break during a busy time! A cup of coffee can refresh your mind, boost your creativity & productivity~~"
                        value={ taskDescription }
                        onChange={ (e) => setTaskDescription(e.target.value) } 
                    />                    
                </div>
                <div className='subtasks-input'>
                    <label>Subtasks</label>
                    {
                        subtasks.map((subtask, index) => {
                            return (
                                <div className="subtasks" key={ index }>
                                    <input
                                        type="text" 
                                        id="subtask" 
                                        name="subtask" 
                                        placeholder={ index > 1 ? placeholders[2] : placeholders[index] }
                                        value={ subtask.title }
                                        onChange={ (e) => setSubtasks((prevSubtasks) => {
                                                                const newSubtasks = [...prevSubtasks];
                                                                newSubtasks[index] = { ...newSubtasks[index], title: e.target.value };
                                                                return newSubtasks;
                                                            }) 
                                                 } 
                                    />  
                                    <img 
                                        src={ cross } 
                                        alt="cross icon" 
                                        onClick={ () => cancelSubtaskClick(index) }
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button className='create-subtask-button' onClick={ createSubtaskClick }>
                    <p>+ Add New Subtask</p>
                </button>

                <div className="status">
                    <p className="status-title">Status</p>
                    <div 
                        className="status-content"
                        onClick={ () => setStatusUnfolded(!statusUnfolded) }
                    >
                        <p>{ activeBoard.columns[statusIndex].name }</p>
                        <img 
                            src={ statusUnfolded ? chevronDown : chevronUp } 
                            alt="status list" 
                        />
                    </div>
                    <ul>
                        {
                            !statusUnfolded &&
                            activeBoard.columns.map((column, index) => {
                                return (
                                    <li 
                                        key={ index }
                                        onClick={() => {
                                                setStatusIndex(index);
                                                setStatusUnfolded(!statusUnfolded);
                                            }
                                        }
                                            
                                    >
                                        <p>{ column.name }</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div> 

                <button className='create-task-button' onClick={ type === 'add' ? createTaskClick : editTaskClick }>
                    <p>{ type === 'add' ? 'Create Task' : 'Save Changes' }</p>
                </button>
            </div>
        </div>
    )
}

export default AddEditTaskModal