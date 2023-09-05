import { useState } from "react";
import AddEditBoardModal from "../addEditBoardModal/AddEditBoardModal";
import './EmptyModal.css';

const EmptyModal = () => {
    const [boardModalOpen, setBoardModalOpen] = useState(false);

    const boardModalToggleClick = () => {
        setBoardModalOpen((state) => !state);
    }

    return (
        <div className="empty-modal-container">
            <div className="modal">
                <div className="description">
                    <h3>There are no boards available. Create a new board to get started.</h3>
                </div>
                <div className="selection">
                    <button 
                        id="add-board"
                        onClick={ boardModalToggleClick }
                    >
                        <p>+ Add New Board</p>
                    </button>
                </div>
            </div>
            { boardModalOpen && <AddEditBoardModal type='add' setBoardModalOpen={ setBoardModalOpen } /> }
        </div>
    )
}

export default EmptyModal