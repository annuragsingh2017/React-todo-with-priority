import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoList = ({ items, toggleCompleted, deleteItem, changePriority }) => {
  return (
    <div className="todo-list">
      {items?.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          toggleCompleted={toggleCompleted}
          deleteItem={deleteItem}
          changePriority={changePriority}
        />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  toggleCompleted: PropTypes.func.isRequired,
  changePriority: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired
  ),
};
export default TodoList;
