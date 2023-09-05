import { useSelector } from 'react-redux';
import { useState } from 'react';
import './Board.css';
import Column from './Column';
import AddEditBoardModal from '../../modals/addEditBoardModal/AddEditBoardModal';

const Board = () => {
    const sidebarToggle = useSelector((state) => state.sidebarToggle);
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];
    const [boardModalOpen, setBoardModalOpen] = useState(false);

    const boardModalToggleClick = () => {
        setBoardModalOpen((state) => !state);
    }

    return (
        <>
            <div className={sidebarToggle ? 'board-container board-full-screen' : 'board-container' }>
                <ul className='board'>
                    {
                        activeBoard.columns.map((column, index) => {
                            return (
                                <li key={ index }>
                                    <Column column={ column } columnIndex={ index } />
                                </li>
                            )
                        })
                    }
                    
                    <li>
                        <p className='col-name hidden'>Add New Column</p>
                        <button id='add-new-col' onClick={ boardModalToggleClick }>
                            <h2>+ New Column</h2>
                        </button>
                    </li>
                </ul>
                { boardModalOpen && <AddEditBoardModal type='edit' setBoardModalOpen={ setBoardModalOpen } /> }
            </div>
        </>
    )
}

export default Board
