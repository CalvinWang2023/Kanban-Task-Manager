import { useSelector } from 'react-redux';
import './Board.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { useMediaQuery } from 'react-responsive';

const Board = () => {
    const isBigScreen = useMediaQuery({query: "(min-width: 768px)"});
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];

    return (
        <div className="board-container">
            { isBigScreen && <Sidebar /> }
            <ul className='board'>
                {
                    activeBoard.columns.map((column) => {
                        return (
                            <li>
                                <p className='status'>{column.name} ({column.tasks.length})</p>
                                {
                                    column.tasks.map((task) => { 
                                        let subTaskCompletedNum = 0;  
                                        return (
                                            <div className="card">
                                                <p className='title'>{ task.title }</p> 
                                                {
                                                    task.subtasks.map((subtask) => {                 
                                                        if (subtask.isCompleted === true) {
                                                            subTaskCompletedNum++;
                                                        }
                                                    })
                                                }
                                                <p className='subtask'>{subTaskCompletedNum} of {task.subtasks.length} subtasks</p>
                                            </div>
                                        )
                                    }) 
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Board