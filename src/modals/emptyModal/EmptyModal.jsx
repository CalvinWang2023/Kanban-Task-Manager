import { useDispatch, useSelector } from "react-redux";
import AddEditBoardModal from "../addEditBoardModal/AddEditBoardModal";
import BoardModalToggleSlice from "../../redux/BoardModalToggleSlice";
import BoardModalTypeSlice from "../../redux/BoardModalTypeSlice";
import './EmptyModal.css';

const EmptyModal = () => {
    const dispatch = useDispatch();
    const boardModalToggle = useSelector((state) => state.boardModalToggle);
    const boardModalType = useSelector((state) => state.boardModalType);

    const boardModalToggleClick = () => {
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
        dispatch(BoardModalTypeSlice.actions.changeAddType())
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
            { boardModalToggle && <AddEditBoardModal type={ boardModalType } /> }
        </div>

    )
}

export default EmptyModal