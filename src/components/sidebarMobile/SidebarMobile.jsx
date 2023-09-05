import './SidebarMobile.css';
import ActiveBoardSlice from '../../redux/ActiveBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
import iconBoard from "../../assets/icon-board.svg";
import iconLight from "../../assets/icon-light-theme.svg";
import iconDark from "../../assets/icon-dark-theme.svg";
import { useState } from 'react';

const SidebarMobile = ({ theme, setTheme, setSidebarMobileOpen }) => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = useSelector((state) => state.activeBoardIndex);
    
    const [boardModalOpen, setBoardModalOpen] = useState(false);

    const sidebarMobileToggleClick = () => {
        setSidebarMobileOpen((state) => !state);
    }

    const changeBoardClick = (index) => {
        dispatch(ActiveBoardSlice.actions.changeActiveBoardIndex({ boardIndex: index }))
    };

    const boardModalToggleClick = () => {
        setBoardModalOpen((state) => !state);
    }

    const handleThemeChanged = () => {
		setTheme((prevTheme) => {
            return prevTheme === 'light' ? 'dark' : 'light';
        });
	};

    return (
        <div
            className="sidebar-mobile-container dimmed"
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
                <div className="switch">
                    <div className="bright-pic">
                        <img src={iconLight} alt="bright mode icon" />
                    </div>
                    <div className="switch-mode">
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="checkbox"
                            onChange={handleThemeChanged} />
                        <label
                            htmlFor="checkbox"
                            className="checkbox-label"
                            id="checkbox-label" >
                            <span className={theme === 'light' ? "ball" : "ball move"}></span>
                        </label>
                    </div>
                    <div className="dark-pic">
                        <img src={iconDark} alt="dark mode icon" />
                    </div>
                </div>
            </div>
            { boardModalOpen && <AddEditBoardModal type='add' setBoardModalOpen={ setBoardModalOpen } /> }
        </div>
    )
}

export default SidebarMobile