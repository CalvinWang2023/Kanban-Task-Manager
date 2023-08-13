import { useDispatch, useSelector } from "react-redux";
import iconBoard from "../../assets/icon-board.svg";
import ActiveBoardSlice from "../../redux/ActiveBoardSlice";
import './Sidebar.css';

const Sidebar = () => {
    const boards = useSelector((state) => state.boards);
    const activeBoard = useSelector((state) => state.activeBoardIndex);
    const dispatch = useDispatch();
    const changeBoardClick = (index) => {
        dispatch(ActiveBoardSlice.actions.changeActiveBoardIndex({ boardIndex: index }))
    };

    return (
        <div className="sidebar-container">
            <div className="summary">
                <p>ALL BOARDS ({boards.length})</p>
            </div>

            <ul>
                {
                    boards.map((board, index) => {
                        return (
                            <section
                                key={index}
                                className={activeBoard === index ? "board-section active-board" : "board-section"}
                                onClick={() => changeBoardClick(index)}
                            >
                                <img src={iconBoard} alt="icon board" />
                                <li>{board.name}</li>
                            </section>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Sidebar