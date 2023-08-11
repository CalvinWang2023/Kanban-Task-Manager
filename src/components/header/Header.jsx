import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo-mobile.svg";
import chevronUp from '../../assets/icon-chevron-up.svg';
import chevronDown from '../../assets/icon-chevron-down.svg';
import addTask from '../../assets/icon-add-task-mobile.svg';
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import { useState } from "react";

const Header = () => {
    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
    const [boardModalUnfolded, setBoardModalUnfolded] = useState(true);

    return (
       <div className="header-container">
            <header>
                <div className="logo-container">
                    <img src={ logo } alt="logo" />
                    {isBigScreen && <h3 className="logo-text">kanban</h3>}
                </div>
                <div className="board-name-container">
                    <img src={ boardModalUnfolded ? chevronDown : chevronUp } onClick={ () => setBoardModalUnfolded(!boardModalUnfolded) } alt="chevron up/down" />
                </div>
                <button>
                    <img src={ addTask } alt="add task button" />
                </button>
                <img src={ ellipsis } alt="ellipsis menu" />
            </header>
       </div> 
    )
}

export default Header