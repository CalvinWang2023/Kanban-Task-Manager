import React from 'react'

const EllipsisMenu = ({ ellipsisModalRef, editModalToggleClick, deleteModalToggleClick }) => {
    return (
        <div className="ellipsis-menu" ref={ellipsisModalRef}>
            <button 
                className="edit"
                onClick={ editModalToggleClick }
            >
                <p>Edit Board</p>
            </button>
            <button 
                className="delete"
                onClick={ deleteModalToggleClick }
            >
                <p>Delete Board</p>
            </button>
        </div>
    )
}

export default EllipsisMenu