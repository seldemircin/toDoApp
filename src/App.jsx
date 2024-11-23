import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { PiNotePencilLight } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  function deleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function updateItemName(id, newName) {
    setItems((items) =>
      items.map((item) => (item.id == id ? { ...item, name: newName } : item))
    );
  }

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-header ">
          <Form name={name} setName={setName} setItems={setItems} />
        </div>
        {items.length > 0 && (
          <div className="card-body">
            <ItemList
              items={items}
              deleteItem={deleteItem}
              updateItemName={updateItemName}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Form({ name, setName, setItems }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      return null;
    }

    const item = {
      id: Date.now(),
      name: name,
      completed: false,
    };

    setItems((items) => [...items, item]);
    setName("");
  };

  return (
    <form
      action=""
      className="d-flex justify-content-between"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        placeholder="Enter a task."
        className="form-control w-75 me-2"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-primary">
        Create ToDo
      </button>
    </form>
  );
}

function ItemList({ items, deleteItem, updateItemName }) {
  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <Item
          item={item}
          deleteItem={deleteItem}
          key={index}
          updateItemName={updateItemName}
        />
      ))}
    </ul>
  );
}

function Item({ item, deleteItem, updateItemName }) {
  const [editable, setEditable] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleUpdateButton = () => {
    setEditable(!editable);
    updateItemName(item.id, newName);
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <span>
          {!editable ? (
            <span>{item.name}</span>
          ) : (
            <input
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          )}
        </span>
        <div className="buttons">
          <button
            className="btn p-0 me-2 text-warning"
            onClick={handleUpdateButton}
          >
            {editable ? (
              <FaCheck style={{ fontSize: "27px", color: "green" }} />
            ) : (
              <PiNotePencilLight style={{ fontSize: "27px" }} />
            )}
          </button>
          <button
            className="btn p-0 text-danger"
            onClick={(e) => {
              let liElement = e.target.closest("li");
              liElement.classList.add(
                "animate__animated",
                "animate__fadeOutLeft",
                "animate__duration-0.5s"
              );
              setTimeout(() => {
                liElement.classList.remove(
                  "animate__animated",
                  "animate__fadeOutLeft",
                  "animate__duration-0.5s"
                );
                deleteItem(item.id);
              }, 500);
            }}
          >
            <MdDeleteForever style={{ fontSize: "27px" }} />
          </button>
        </div>
      </div>
    </li>
  );
}

export default App;
