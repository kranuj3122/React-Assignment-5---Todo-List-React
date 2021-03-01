import React, { useState } from "react";
import "./../styles/App.css";

function App() {
  let [inputValue, setInputValue] = useState("");
  let [toDoList, setList] = useState([]);
  let [showList, setShowList] = useState(false);
  let [updatedValue, setUpdatedValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const addToList = () => {
    if (inputValue === "") {
      return;
    }
    const newItem = { id: toDoList.length, value: inputValue, editable: false };
    // copy list
    const copiedList = [...toDoList];

    // store new value
    copiedList.push(newItem);

    // set list
    setList(copiedList);
    setInputValue("");
    setShowList(true);
  };
  const deleteItem = (id) => {
    let tempList = [...toDoList];
    tempList = tempList.filter((item) => item.id != id);
    setList(tempList);
    if (tempList.length === 0) {
      setShowList(false);
    }
  };
  const editItem = (ind) => {
    let copy = [...toDoList];
    copy = copy.map((item, index) => {
      if (ind !== index) {
        return item;
      }
      let itemCopy = { ...item, editable: true };
      setUpdatedValue(item.value);
      return itemCopy;
    });
    setList(copy);
  };
  const handleEditChange = (e) => {
    setUpdatedValue(e.target.value);
  };
  const update = (ind) => {
    if (updatedValue === "") {
      return;
    }
    let updatedItem = { id: ind, value: updatedValue, editable: false };
    let copy = [...toDoList];
    copy = copy.map((item, index) => {
      if (index != ind) {
        return item;
      }
      return updatedItem;
    });
    setList(copy);
  };
  return (
    <div id="main">
      {/* //Do not alter main div
	//Please do not alter the functional component as tests depend on the type of component. */}
      <h1>To Do App</h1>
      <textarea id="task" value={inputValue} onChange={handleChange} />
      <button id="btn" onClick={addToList}>
        Add to List
      </button>
      <div>
        <ul>
          {showList &&
            toDoList.map((item, index) => {
              return (
                <li className="list" key={index}>
                  {item.editable ? (
                    <>
                      <textarea
                        id="editTask"
                        value={updatedValue}
                        onChange={handleEditChange}
                      />
                      <button
                        id="saveTask"
                        onClick={() => {
                          update(index);
                        }}
                      >
                        save
                      </button>
                    </>
                  ) : (
                    <>
                      {item.value}
                      <button
                        className="edit"
                        onClick={() => {
                          editItem(index);
                        }}
                      >
                        edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        delete
                      </button>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
