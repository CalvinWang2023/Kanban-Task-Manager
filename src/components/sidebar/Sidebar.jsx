import { useDispatch, useSelector } from "react-redux";
import iconBoard from "../../assets/icon-board.svg";
import ActiveBoardSlice from "../../redux/ActiveBoardSlice";
import SidebarToggleSlice from "../../redux/SidebarToggleSlice";
import sidebarHide from "../../assets/icon-hide-sidebar.svg";
import sidebarShow from "../../assets/icon-show-sidebar.svg";
import iconLight from "../../assets/icon-light-theme.svg";
import iconDark from "../../assets/icon-dark-theme.svg";
import './Sidebar.css';
import { useState } from "react";
import AddEditBoardModal from "../../modals/addEditBoardModal/AddEditBoardModal";

const Sidebar = ({ theme, setTheme }) => {
    const boards = useSelector((state) => state.boards);
    const activeBoard = useSelector((state) => state.activeBoardIndex);
    const sidebarToggle = useSelector((state) => state.sidebarToggle);

    const [boardModalOpen, setBoardModalOpen] = useState(false);

	const handleThemeChanged = () => {
		setTheme((prevTheme) => {
            return prevTheme === 'light' ? 'dark' : 'light';
        });
	};

    const dispatch = useDispatch();
    const changeBoardClick = (index) => {
        dispatch(ActiveBoardSlice.actions.changeActiveBoardIndex({ boardIndex: index }))
    };

    const sidebarHideClick = () => {
        dispatch(SidebarToggleSlice.actions.toggleSidebar())
    };

    const boardModalToggleClick = () => {
        setBoardModalOpen((state) => !state);
    };

    return (            
        <div className={ !sidebarToggle ? "sidebar-container" : "closed" }>
            {
                !sidebarToggle &&
                <div className="container">
                    <div className="summary">
                        <p>ALL BOARDS ({boards.length})</p>
                    </div>

                    <ul>
                        {   boards.map((board, index) => {
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
                    <div className="switch">
                        <div className="bright-pic">
                            <img src={ iconLight } alt="bright mode icon" />
                        </div>
                        <div className="switch-mode">
                            <input 
                                type="checkbox" 
                                className="checkbox" 
                                id="checkbox"
                                onChange={ handleThemeChanged } />
                            <label 
                                htmlFor="checkbox" 
                                className="checkbox-label"
                                id="checkbox-label" >
                                <span className={ theme === 'light' ? "ball" : "ball move" }></span>
                            </label>
                        </div>
                        <div className="dark-pic">
                            <img src={ iconDark } alt="dark mode icon" />
                        </div>
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
            {   sidebarToggle &&
                <div
                    className="sidebar-open"
                    onClick={sidebarHideClick}
                >
                    <img src={sidebarShow} alt="show sidebar icon" />
                </div>
            }
            { boardModalOpen && <AddEditBoardModal type='add' setBoardModalOpen={ setBoardModalOpen } /> }
        </div>
    )
}

export default Sidebar