import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ list, removeItem, editItem, clearAll }) => {
    return (
        <div className="grocery-container">
            <div className="grocery-list">
                {
                    list.map(item => {
                        const { name, id } = item
                        return (
                            <div className='grocery-item' key={id} >
                                <p className="title">{name}</p>
                                <div>
                                    <button className="edit-btn" onClick={() => editItem(id, name)}>
                                        <FaEdit />
                                    </button>
                                    <button className="delete-btn" onClick={() => removeItem(id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                {
                list.length===0?
                null:
                <button className="clear-btn" onClick={clearAll}>Clear Items</button>
                }
            </div>
        </div>
    )
}

export default List
