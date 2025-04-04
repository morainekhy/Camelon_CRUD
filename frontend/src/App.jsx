import React, { useState, useEffect } from "react";
import axios from 'axios';

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Fetch items from API
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching items", error));
  }, []);

  // Add new item
  const addItem = () => {
    axios.post(API_URL, { name: newItem })
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error("Error Adding item", error));
  };

  // Update item
  const updateItem = (id, name) => {
    axios.put(`${API_URL}/${id}`, { name })
      .then(response => {
        setItems(items.map(item => (item.id === id ? response.data : item)));
      })
      .catch(error => console.error("Error Updating item", error));
  };

  // Delete item
  const deleteItem = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error("Error deleting item", error));
  };

  return (
    <>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, e.target.value)}
            />
            <button onClick={() => deleteItem(item.id)}>Delete Item</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
