import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo-mobile.svg";
import iconBoard from "../../assets/icon-board.svg";
import ActiveBoardSlice from "../../redux/ActiveBoardSlice";
import SidebarToggleSlice from "../../redux/SidebarToggleSlice";
import BoardModalToggleSlice from "../../redux/BoardModalToggleSlice";
import BoardModalTypeSlice from "../../redux/BoardModalTypeSlice";
import sidebarHide from "../../assets/icon-hide-sidebar.svg";
import sidebarShow from "../../assets/icon-show-sidebar.svg";

import './Sidebar.css';

const Sidebar = () => {
    const boards = useSelector((state) => state.boards);
    const activeBoard = useSelector((state) => state.activeBoardIndex);
    const sidebarToggle = useSelector((state) => state.sidebarToggle);

    const dispatch = useDispatch();
    const changeBoardClick = (index) => {
        dispatch(ActiveBoardSlice.actions.changeActiveBoardIndex({ boardIndex: index }))
    };

    const sidebarHideClick = () => {
        dispatch(SidebarToggleSlice.actions.toggleSidebar())
    };

    const boardModalToggleClick = () => {
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
        dispatch(BoardModalTypeSlice.actions.changeAddType());
    }

    return (            
        <div className={ !sidebarToggle ? "sidebar-container" : "closed" }>
            {
                !sidebarToggle &&
                <div className="container">
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
                    <div
                        className="sidebar-hide"
                        onClick={sidebarHideClick}
                    >
                        <img src={sidebarHide} alt="hide sidebar icon" />
                        <p>Hide Sidebar</p>
                    </div>
                </div>
            }
            {
                sidebarToggle &&
                <div
                    className="sidebar-open"
                    onClick={sidebarHideClick}
                >
                    <img src={sidebarShow} alt="show sidebar icon" />
                </div>
            }
        </div>
    )
}

export default Sidebar