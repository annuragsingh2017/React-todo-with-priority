import "./TodoHead.css";
import PropTypes from "prop-types";

const TodoHead = ({ handleOpenAddForm, deleteCompletedItems, items }) => {
  const fontSize = "x-large";
  const flexContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };
  const iconWrapperStyle = {
    cursor: "pointer",
  };

  const deleteCompletedStyle = {
    cursor:
      items?.length === 0 || items?.every((data) => !data.completed)
        ? "not-allowed"
        : "pointer",
    textAlign: "center",
  };

  return (
    <div style={flexContainerStyle}>
      <h1>ToDo List</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          className="icon-wrapper"
          style={iconWrapperStyle}
          onClick={handleOpenAddForm}
        >
          <i
            className="fa fa-plus-square"
            aria-hidden="true"
            style={{ fontSize }}
          ></i>
          <span className="tooltip">Add New Task</span>
        </div>
        <div
          className="delete-completed icon-wrapper"
          onClick={deleteCompletedItems}
          style={deleteCompletedStyle}
        >
          <div>
            <i
              className="fa fa-check"
              aria-hidden="true"
              style={{ color: "green" }}
            ></i>
            <span className="tooltip">Delete Completed</span>
          </div>
          <div>
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              style={{ color: "red", fontSize }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};
TodoHead.propTypes = {
  handleOpenAddForm: PropTypes.func.isRequired,
  deleteCompletedItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired
  ),
};
export default TodoHead;
