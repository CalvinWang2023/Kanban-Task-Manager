import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import './Header.css';
import logo from "../../assets/logo-mobile.svg";
import chevronUp from '../../assets/icon-chevron-up.svg';
import chevronDown from '../../assets/icon-chevron-down.svg';
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import addSign from '../../assets/icon-add-task-mobile.svg';
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../../modals/addEditTaskModal/AddEditTaskModal";
import SidebarMobile from "../sidebarMobile/SidebarMobile";
import DeleteModal from "../../modals/deleteModal/DeleteModal";
import AddEditBoardModal from "../../modals/addEditBoardModal/AddEditBoardModal";
import BoardsSlice from "../../redux/BoardsSlice";

const Header = ({ theme, setTheme }) => {
    const dispatch = useDispatch();
    const [addEditTaskModalOpen, setAddEditTaskModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [boardModalOpen, setBoardModalOpen] = useState(false);
    const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex); 
    const activeBoard = boards[activeBoardIndex];
    const sidebarToggle = useSelector((state) => state.sidebarToggle);
    const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);

    const ellipsisModalRef = useRef(null);
    const ellipsisImgRef = useRef(null);

    const clickOnOutside = (e) => {
        const element = e.target;

        if (!ellipsisImgRef.current?.contains(element) && !ellipsisModalRef.current?.contains(element)) {
            setIsEllipsisMenuOpen(false);
            document.body.removeEventListener("click", clickOnOutsideRef.current);
        }
    }

    const clickOnOutsideRef = useRef(clickOnOutside);
    
    const ellipsisMenuControl = () => {
        if (isEllipsisMenuOpen === false) {
            document.body.addEventListener("click", clickOnOutsideRef.current);
        } else {
            document.body.removeEventListener("click", clickOnOutsideRef.current);
        }
        setIsEllipsisMenuOpen(!isEllipsisMenuOpen);
    };

    const addEditTaskModalToggleClick = () => {
        setAddEditTaskModalOpen((state) => !state);
    }

    const boardModalToggleClick = () => {
        ellipsisMenuControl();
        setBoardModalOpen((state) => !state);
    }

    const deleteModalToggleClick = () => {
        ellipsisMenuControl();
        setDeleteModalOpen((state) => !state);
    }

    const sidebarMobileToggleClick = () => {
        setSidebarMobileOpen((state) => !state);
    }

    const deleteBoardClick = () => {
        setDeleteModalOpen((state) => !state);
        dispatch(BoardsSlice.actions.deleteBoard({ boardIndex: activeBoardIndex }));
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
                                                src={ sidebarMobileOpen ? chevronUp : chevronDown } 
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
                    <div className="ellipsis" ref={ellipsisImgRef}>
                        <button 
                            className="ellipsis-button"
                            onClick={ ellipsisMenuControl }
                        >
                            <img 
                                src={ ellipsis } 
                                alt="ellipsis menu" 
                            />
                        </button>
                    </div>
                </div>
            </header>
            { isEllipsisMenuOpen &&
                <div className="ellipsis-menu" ref={ellipsisModalRef}>
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
            { sidebarMobileOpen && !isBigScreen &&
                <SidebarMobile theme = { theme } setTheme = { setTheme } setSidebarMobileOpen={ setSidebarMobileOpen } /> 
            }
            { boardModalOpen && <AddEditBoardModal type='edit' setBoardModalOpen={ setBoardModalOpen } /> }
            { addEditTaskModalOpen && <AddEditTaskModal type='add' setAddEditTaskModalOpen={ setAddEditTaskModalOpen } /> } 
            { deleteModalOpen && <DeleteModal type='board' deleteClick={ deleteBoardClick } setDeleteModalOpen={ setDeleteModalOpen } /> }    
       </div> 
    )
}

export default Header