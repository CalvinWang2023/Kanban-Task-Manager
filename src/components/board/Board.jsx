import { useSelector } from 'react-redux';
import './Board.css';
import Header from '../header/Header';
import AddEditBoardModal from "../../modals/AddEditBoardModal";
import { useState } from 'react';

const Board = () => {
    const sidebarToggle = useSelector((state) => state.sidebarToggle);
    const boardModal = useSelector((state) => state.boardModalToggle);

    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];

    return (
        <div className={sidebarToggle ? 'board-container full-screen' : 'board-container' }>
            <Header /> 
            { !boardModal && (<AddEditBoardModal />) }
            <ul className='board'>
                {
                    activeBoard.columns.map((column, columnIndex) => {
                        return (
                            <li key={ columnIndex }>
                                <p className='status'>{column.name} ({column.tasks.length})</p>
                                {
                                    column.tasks.map((task, taskIndex) => { 
                                        let subTaskCompletedNum = 0;  
                                        return (
                                            <div className="card" key={ taskIndex }>
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