import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import './Header.css';
import logo from "../../assets/logo-mobile.svg";
import chevronUp from '../../assets/icon-chevron-up.svg';
import chevronDown from '../../assets/icon-chevron-down.svg';
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import addSign from '../../assets/icon-add-task-mobile.svg';
import { useSelector, useDispatch } from "react-redux";
import AddEditTaskModalToggleSlice from "../../redux/AddEditTaskModalToggleSlice";
import AddEditTaskModalTypeSlice from "../../redux/AddEditTaskModalTypeSlice";
import BoardModalToggleSlice from "../../redux/BoardModalToggleSlice";
import BoardModalTypeSlice from "../../redux/BoardModalTypeSlice";
import DeleteModalToggleSlice from "../../redux/DeleteModalToggleSlice";
import DeleteModalTypeSlice from "../../redux/DeleteModalTypeSlice";
import SidebarMobile from "../sidebarMobile/SidebarMobile";
import SidebarMobileToggleSlice from "../../redux/SidebarMobileToggleSlice";

const Header = ({ theme, setTheme }) => {
    const dispatch = useDispatch();
    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
    const sidebarMobileToggle = useSelector((state) => state.sidebarMobileToggle);
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex); 
    const activeBoard = boards[activeBoardIndex];
    const sidebarToggle = useSelector((state) => state.sidebarToggle);
    const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);

    const addEditTaskModalToggleClick = () => {
        dispatch(AddEditTaskModalToggleSlice.actions.toggleAddEditTaskModal());
        dispatch(AddEditTaskModalTypeSlice.actions.changeAddType());
    }

    const boardModalToggleClick = () => {
        setIsEllipsisMenuOpen(!isEllipsisMenuOpen);
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
        dispatch(BoardModalTypeSlice.actions.changeEditType());
    }

    const deleteModalToggleClick = () => {
        setIsEllipsisMenuOpen(!isEllipsisMenuOpen);
        dispatch(DeleteModalToggleSlice.actions.toggledeleteModal());
        dispatch(DeleteModalTypeSlice.actions.changeBoardType());
    }

    const sidebarMobileToggleClick = () => {
        dispatch(SidebarMobileToggleSlice.actions.toggleSidebarMobile());
    }

    return (
       <div className="header-container">
            <header>
                <div className="left">
                    <div className="logo-container">
                        <img src={ logo } alt="logo" />
                        { isBigScreen && <h3 className="logo-text">kanban</h3> }   
                    </div>
                    <div className={ !sidebarToggle ? "board-name-container" : "board-name-container full-screen" }>
                        <h4>{ activeBoard.name }</h4>
                        { !isBigScreen && <img 
                                                src={ sidebarMobileToggle ? chevronUp : chevronDown } 
                                                onClick={ sidebarMobileToggleClick } 
                                                className="chevron"
                                                alt="chevron up/down" /> 
                        }
                    </div>                    
                </div>      
                <div className="right">
                    <button 
                        onClick={ addEditTaskModalToggleClick }
                        disabled={ activeBoard.columns.length <= 0 }
                        className="add-task"
                    >   
                        {
                            isBigScreen ? 
                                <p>+ Add New Task</p> 
                                : <img src={ addSign } alt="add icon" />     
                        }
                    </button>
                    <div className="ellipsis">
                        <button 
                            className="ellipsis-button"
                            onClick={ () => setIsEllipsisMenuOpen(!isEllipsisMenuOpen) }
                        >
                            <img 
                                src={ ellipsis } 
                                alt="ellipsis menu" 
                            />
                        </button>
                    </div>
                </div>
            </header>
            {
                isEllipsisMenuOpen &&
                <div className="ellipsis-menu">
                    <button 
                        className="edit"
                        onClick={ boardModalToggleClick }
                    >
                        <p>Edit Board</p>
                    </button>
                    <button 
                        className="delete"
                        onClick={ deleteModalToggleClick }
                    >
                        <p>Delete Board</p>
                    </button>
                </div>
            }
            {
                sidebarMobileToggle && 
                !isBigScreen &&
                <SidebarMobile theme = { theme } setTheme = { setTheme } /> 
            }
       </div> 
    )
}

export default Header