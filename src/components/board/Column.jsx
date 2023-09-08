import Task from './Task';
import BoardsSlice from '../../redux/BoardsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Column = ({ column, columnIndex }) => {
    const dispatch = useDispatch();
    const activeBoardIndex = useSelector((state) => state.activeBoardIndex);
    const statusColors = [
        "#33FFD8", // Teal
        "#FFA733", // Orange 
        "#A033FF", // Purple
        "#FF33A6", // Pink
        "#FFFF33", // Yellow
        "#33FF77", // Green
        "#FF5733", // Red
        "#3388FF" // Blue
    ];
    const handleOnDrop = (e) => {
        const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));
    
        if (columnIndex !== prevColIndex) {
          dispatch(BoardsSlice.actions.dragTask({ activeBoardIndex, columnIndex, prevColIndex, taskIndex }));
        }
    }
    
    const handleOnDragOver = (e) => {
        e.preventDefault()
    }

    return (
        <div className='column' onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
            <div className="col-name">
                <span className="col-name-color" style={{backgroundColor: statusColors[columnIndex % 8]}}></span>
                <p className='col-name-text'>{column.name} ({column.tasks.length})</p>
            </div>
            {   column.tasks.map((task, index) => {  
                    return (
                        <Task key={ index } task={ task } columnIndex={ columnIndex } taskIndex={ index } />
                    )
                }) 
            }     
        </div>
    )
}

export default Column