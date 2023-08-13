import { useSelector } from 'react-redux';
import './Board.css';
import Header from '../header/Header';

const Board = () => {
    const sidebarToggle = useSelector((state) => state.sidebarToggle);

    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];

    return (
        <div className={sidebarToggle ? 'board-container full-screen' : 'board-container' }>
            <Header /> 
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