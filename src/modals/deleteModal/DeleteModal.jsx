import { useSelector } from "react-redux";
import './DeleteModal.css';

const DeleteModal = ({ type, columnIndex, taskIndex, deleteClick, setDeleteModalOpen }) => {
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];
    
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
                    <h1>{ `Delete this ${ type }?` }</h1>
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
                        onClick={ () => deleteClick() }
                    >
                        <p>Delete</p>
                    </button>
                    <button 
                        className="cancel"
                        onClick={ () => setDeleteModalOpen((state) => !state) }
                    >
                        <p>Cancel</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal