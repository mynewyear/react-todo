const TodoListItem = ({ todo, onRemoveTodo, todoCompletion }) => {
    if (!todo) {
        return <li>Error: Todo item is missing or incomplete.</li>;
    }
    const {title, id, completed} = todo;

    return (
        <li style={{textDecoration: completed ? "line-through" : "none"}}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todoCompletion(todo.id)}
            />
            {title}
            <button type="button" onClick={() => onRemoveTodo(id)}>Remove</button>
        </li>
    );
};

export default TodoListItem;
