import './SidebarMobile.css';
import SidebarMobileToggleSlice from '../../redux/SidebarMobileToggleSlice';
import ActiveBoardSlice from '../../redux/ActiveBoardSlice';
import BoardModalToggleSlice from '../../redux/BoardModalToggleSlice';
import BoardModalTypeSlice from '../../redux/BoardModalTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import iconBoard from "../../assets/icon-board.svg";

const SidebarMobile = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = useSelector((state) => state.activeBoardIndex);

    const sidebarMobileToggleClick = () => {
        dispatch(SidebarMobileToggleSlice.actions.toggleSidebarMobile());
    }

    const changeBoardClick = (index) => {
        dispatch(ActiveBoardSlice.actions.changeActiveBoardIndex({ boardIndex: index }))
    };

    const boardModalToggleClick = () => {
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
        dispatch(BoardModalTypeSlice.actions.changeAddType());
    }

    return (
        <div
            className="sidebar-mobile-modal-container dimmed"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                sidebarMobileToggleClick();
            }}
        >
            <div className='modal'>
                <div className="summary">
                    <p>ALL BOARDS ({boards.length})</p>
                </div>

                <ul>
                    {
                        boards.map((board, index) => {
                            return (
                                <li
                                    key={index}
                                    className={activeBoard === index ? "board-section active-board" : "board-section"}
                                    onClick={() => changeBoardClick(index)}
                                >
                                    <img src={iconBoard} alt="icon board" />
                                    <p>{board.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div
                    className="add-board-button"
                    onClick={boardModalToggleClick}
                >
                    <button>
                        <img src={iconBoard} alt="icon board" className="icon-board" />
                        <p>+ Create New Board</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SidebarMobile