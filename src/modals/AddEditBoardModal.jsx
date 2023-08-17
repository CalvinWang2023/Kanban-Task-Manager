import './AddEditBoardModal.css';
import { useDispatch, useSelector } from "react-redux";
import BoardModalToggleSlice from "../redux/BoardModalToggleSlice";
import BoardsSlice from '../redux/BoardsSlice';
import cross from '../assets/icon-cross.svg';
import { useState, useEffect } from 'react';

const AddEditBoardModal = ({ type }) => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const activeBoard = boards[activeBoardIndex];

    const placeholders = ['e.g. Todo...', 'e.g. Doing...', 'e.g. Done...', 'Your Column Title...'];
    const [boardName, setBoardName] = useState('');
    const [columns, setColumns] = useState([{ name: '', tasks: [] }, { name: '', tasks: [] }]);

    const boardModalToggleClick = () => {
        dispatch(BoardModalToggleSlice.actions.toggleBoardModal());
    }

    const CreateBoardClick = () => {
        const newColumns =  columns.filter((column) => column.name !== '');
        type === 'add' ? 
            dispatch(BoardsSlice.actions.addBoard({ name: boardName, 
                                                        newColumns: newColumns }))
            : dispatch(BoardsSlice.actions.editBoard({ name: boardName, 
                                                        newColumns: newColumns, 
                                                        index: activeBoardIndex }));
        boardModalToggleClick();
    }

    const CreateColumnClick = () => {
        setColumns((prevColumns) => {
            const newColumns = [...prevColumns, { name: '', tasks: [] }];
            return newColumns;
        })
    }

    const cancelColumnClick = (index) => {
        setColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            newColumns.splice(index, 1);
            return newColumns;
        })
    }

    useEffect(() => {
        if (type === 'edit') {
            setBoardName(activeBoard.name);
            setColumns(activeBoard.columns);
        }
        console.log('koniqiwa');
    }, []);

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
                    <h1>{ type === 'add' ? 'Add New Board' : "Edit Board" }</h1>
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
                                                                const newColumns = [...prevcolumns];
                                                                newColumns[index] = { ...newColumns[index], name: e.target.value };
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
                    <p>+ Add New Columns</p>
                </button>               
                <button className='create-board-button' onClick={ CreateBoardClick }>
                    <p>{ type === 'add' ? 'Create New Board' : 'Save Changes' }</p>
                </button>
            </div>
        </div>
    )
}

export default AddEditBoardModal