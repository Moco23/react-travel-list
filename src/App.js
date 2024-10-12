import { useState } from "react";

export default function App() {
  // lift up for display new item in packin glist
  const [items, setItems] = useState([]);

  // handle add items function
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // handle delete items function
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Awey 🏝️</h1>;
}

function Form({ onAddItems }) {
  // set controls for elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // handle submitting form
  function handleSubmit(e) {
    // desible auto reloading after form submission
    e.preventDefault();

    // check description
    if (!description) return;

    // new item
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    // new item
    onAddItems(newItem);

    // set to initial state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* dynamicly creating option html element */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X item on list, and you already packed X (X%)</em>
    </footer>
  );
}
