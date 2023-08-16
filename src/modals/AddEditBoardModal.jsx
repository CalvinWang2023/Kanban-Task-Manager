import './AddEditBoardModal.css';
import { useDispatch } from "react-redux";
import BoardModalToggleSlice from "../redux/BoardModalToggleSlice";
import BoardsSlice from '../redux/BoardsSlice';
import cross from '../assets/icon-cross.svg';
import { useState } from 'react';

const AddEditBoardModal = () => {
    const dispatch = useDispatch();
    const placeholders = ['e.g. Todo...', 'e.g. Doing...', 'e.g. Done...', 'Your Column Title...'];
    const [boardName, setBoardName] = useState('');
    const [columns, setColumns] = useState([{ name: '', tasks: [] }, { name: '', tasks: [] }]);

    const boardModalToggleClick = () => {
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
    }

    const CreateBoardClick = () => {
        const newColumns =  columns.filter((column) => column.name !== '');
        dispatch(BoardsSlice.actions.addBoard({ name: boardName, newColumns: newColumns }));
        boardModalToggleClick();
    }

    const CreateColumnClick = () => {
        setColumns((prevColumns) => {
            const newColumns = [...prevColumns, { name: '', tasks: [] }];
            return newColumns;
        })
    }

    const cancelColumnClick = (index) => {
        let columnIndex = index <= 1 ? 2 : index;

        setColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            newColumns.splice(columnIndex, 1);
            return newColumns;
        })
    }

    return (
        <div 
            className="modal-container dimmed"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                boardModalToggleClick();
            }}
        >
            <div className="modal">
                <div className="title">
                    <h1>Add New Board</h1>
                </div>
                <div className='board-name-input'>
                    <label htmlFor="board-name">Board Name</label>
                    <input 
                        type="text" 
                        id="board-name" 
                        name="board-name" 
                        placeholder='e.g. Web Design'
                        value={ boardName }
                        onChange={ (e) => setBoardName(e.target.value) } 
                    />                    
                </div>
                <div className='board-column-input'>
                    <label>Board Columns</label>
                    {
                        columns.map((column, index) => {
                            return (
                                <div className="column-task" key={ index }>
                                    <input
                                        type="text" 
                                        id="board-column" 
                                        name="board-column" 
                                        placeholder={ index > 2 ? placeholders[3] : placeholders[index] }
                                        value={ column.name }
                                        onChange={ (e) => setColumns((prevcolumns) => {
                                                                const newColumns = [...prevcolumns]
                                                                newColumns[index].name = e.target.value;
                                                                return newColumns;
                                                            }) 
                                                 } 
                                    />  
                                    <img 
                                        src={ cross } 
                                        alt="cross icon" 
                                        onClick={ () => cancelColumnClick(index) }
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button className='create-column-button' onClick={ CreateColumnClick }>
                    <p>+ Create New Columns</p>
                </button>               
                <button className='create-board-button' onClick={ CreateBoardClick }>
                    <p>Create New Board</p>
                </button>
            </div>
        </div>
    )
}

export default AddEditBoardModal