import React from "react";
import "./TodoListitem.css";

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => (
    <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <div>
            <button
                onClick={() => onCompletedPressed(todo.id)}
                className="completed-button"
            >
                Mark As Completed
            </button>
            <button
                onClick={() => onRemovePressed(todo.id)}
                className="remove-button"
            >
                Remove
            </button>
        </div>
    </div>
);

export default TodoListItem;
