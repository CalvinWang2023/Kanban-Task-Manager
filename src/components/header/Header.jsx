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

const Header = () => {
    const dispatch = useDispatch();
    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
    const [boardModalUnfolded, setBoardModalUnfolded] = useState(true);
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex); 
    const activeBoard = boards[activeBoardIndex];
    const sidebarToggle = useSelector((state) => state.sidebarToggle);

    const addEditTaskModalToggleClick = () => {
        dispatch(AddEditTaskModalToggleSlice.actions.toggleAddEditTaskModal());
        dispatch(AddEditTaskModalTypeSlice.actions.changeAddType());
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
                                                src={ boardModalUnfolded ? chevronDown : chevronUp } 
                                                onClick={ () => setBoardModalUnfolded(!boardModalUnfolded) } 
                                                className="chevron"
                                                alt="chevron up/down" /> 
                        }
                    </div>                    
                </div>      
                <div className="right">
                    <button onClick={ addEditTaskModalToggleClick }>   
                        {
                            isBigScreen ? 
                                <p>+ Add New Task</p> 
                                : <img src={ addSign } alt="add icon" />     
                        }
                    </button>
                    <div className="ellipsis">
                        <img src={ ellipsis } alt="ellipsis menu" />
                    </div>
                </div>
            </header>
       </div> 
    )
}

export default Header