import { useState } from "react";

export default function Form({ onAddItems }) {
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
