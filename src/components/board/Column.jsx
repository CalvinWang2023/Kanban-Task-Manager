import Task from './Task';

const Column = ({ column, columnIndex }) => {
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

    return (
        <>
            <div className="col-name">
                <span className="col-name-color" style={{backgroundColor: statusColors[columnIndex % 8]}}></span>
                <p className='col-name-text'>{column.name} ({column.tasks.length})</p>
            </div>
            {
                column.tasks.map((task, index) => {  
                    return (
                        <Task key={ index } task={ task } columnIndex={ columnIndex } taskIndex={ index } />
                    )
                }) 
            }     
        </>
    )
}

export default Column