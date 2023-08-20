import { useDispatch, useSelector } from "react-redux";
import DeleteModalToggleSlice from "../../redux/DeleteModalToggleSlice";
import './DeleteModal.css';
import BoardsSlice from "../../redux/BoardsSlice";

const DeleteModal = ({ type, columnIndex, taskIndex }) => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];

    const deleteModalToggleClick = () => {
        dispatch(DeleteModalToggleSlice.actions.toggledeleteModal());
    }

    const deleteBoardClick = () => {
        deleteModalToggleClick();
        dispatch(BoardsSlice.actions.deleteBoard({ boardIndex: activeBoardIndex }));
    }
    const deleteTaskClick = () => {
        deleteModalToggleClick();
        dispatch(BoardsSlice.actions.deleteTask({ boardIndex: activeBoardIndex, 
                                                    columnIndex: columnIndex, 
                                                    taskIndex: taskIndex }));
    }
    
    return (
        <div 
            className="delete-modal-container dimmed"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                deleteModalToggleClick();
            }}
        >
            <div className="modal">
                <div className="title">
                    <h1>{ type === 'board' ? 'Delete this board?' : "Delete this task?" }</h1>
                </div>
                <div className="content">
                    <p>
                        { 
                            type === 'board' ? 
                            `Are you sure you want to delete the "${ activeBoard.name }" board? 
                                This action will remove all columns and tasks and cannot be reversed.`
                            : `Are you sure you want to delete the "${ activeBoard.columns[columnIndex].tasks[taskIndex].title }" task and its subtasks? 
                                This action cannot be reversed.` 
                        }
                    </p>
                </div>
                <div className="button-choices">
                    <button 
                        className="delete"
                        onClick={ type === 'board' ? deleteBoardClick : deleteTaskClick }
                    >
                        <p>Delete</p>
                    </button>
                    <button 
                        className="cancel"
                        onClick={ deleteModalToggleClick }
                    >
                        <p>Cancel</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal