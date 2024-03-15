import "../index.css";
import PropTypes from "prop-types";

const TodoItem = ({ item, toggleCompleted, deleteItem, changePriority }) => {
  const { id, text, completed, priority } = item || {};

  const handleCheckboxChange = () => {
    toggleCompleted(id);
  };

  const handleDeleteClick = () => {
    deleteItem(id);
  };

  const handlePriorityChange = (e) => {
    changePriority(id, e.target.value);
  };

  return (
    <tr className="todo-item">
      <td className="table-row">
        <input
          className="custom-checkbox"
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
      </td>
      <td className="truncate">
        <span className={completed ? "completed-task" : ""}>{text}</span>
      </td>
      <td>
        <select value={priority} onChange={handlePriorityChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </td>
      <td>
        <button onClick={handleDeleteClick}>
          <i
            className="fa fa-trash-o"
            aria-hidden="true"
            style={{ fontSize: "x-large" }}
          ></i>
        </button>
      </td>
    </tr>
  );
};
TodoItem.propTypes = {
  toggleCompleted: PropTypes.func.isRequired,
  changePriority: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
};
export default TodoItem;
