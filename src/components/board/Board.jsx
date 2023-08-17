import { useDispatch, useSelector } from 'react-redux';
import './Board.css';
import Header from '../header/Header';
import AddEditBoardModal from "../../modals/addEditBoardModal/AddEditBoardModal";
import BoardModalToggleSlice from "../../redux/BoardModalToggleSlice";
import BoardModalTypeSlice from "../../redux/BoardModalTypeSlice";

const Board = () => {
    const sidebarToggle = useSelector((state) => state.sidebarToggle);
    const boardModalToggle = useSelector((state) => state.boardModalToggle);
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const boardModalType = useSelector((state) => state.boardModalType);
    const activeBoard = boards[activeBoardIndex];
    const dispatch = useDispatch();

    const boardModalToggleClick = () => {
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
        dispatch(BoardModalTypeSlice.actions.changeEditType());
    }

    return (
        <div className={sidebarToggle ? 'board-container full-screen' : 'board-container' }>
            <Header /> 
            { boardModalToggle && (<AddEditBoardModal type={ boardModalType } />) }
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
                                            <div className="card" key={ taskIndex }>
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
    )
}

export default Board