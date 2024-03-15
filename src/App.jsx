import { useState, useEffect } from "react";
import TodoList from "./components/TodoList.jsx";
import TodoHead from "./components/TodoHead.jsx";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [items, setItems] = useState([]);
  const [renderForm, setRenderForm] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("todoItems", JSON.stringify(updatedItems));
  };

  const addItem = () => {
    if (inputText.trim() !== "") {
      const newItem = {
        id: Date.now(),
        text: inputText,
        completed: false,
        priority: priority,
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
      setInputText("");
      setPriority("Medium");
      setRenderForm(false);
    }
  };

  const toggleCompleted = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const deleteCompletedItems = () => {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const changePriority = (id, newPriority) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, priority: newPriority } : item
    );
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleOpenAddForm = () => {
    setRenderForm(true);
  };

  const sortedItems = [...items].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="todo-app">
      <TodoHead
        handleOpenAddForm={handleOpenAddForm}
        deleteCompletedItems={deleteCompletedItems}
        items={items}
      />
      {renderForm ? (
        <div className="app-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a new task"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={addItem} disabled={!inputText}>
            Submit
          </button>
        </div>
      ) : (
        <>
          {items?.length === 0 && (
            <div className="empty-message">No to-dos yet!</div>
          )}
          <TodoList
            items={sortedItems}
            toggleCompleted={toggleCompleted}
            deleteItem={deleteItem}
            changePriority={changePriority}
          />
        </>
      )}
    </div>
  );
};

export default App;
