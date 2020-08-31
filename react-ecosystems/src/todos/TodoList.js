import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import { displayAlert } from "./thunks";
import "./TodoList.css";

const TodoList = ({
    todos = [],
    onRemovePressed,
    onCompletedPressed,
    onDisplayAlertClicked,
    isLoading,
    startLoadingTodos
}) => {

    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map((todo, i) => (
                <TodoListItem
                    key={i}
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed}
                />
            ))}
        </div>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
    onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
    onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
