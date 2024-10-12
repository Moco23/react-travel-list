import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  // toogle functionality
  function handleToogleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              packed: !item.packed,
            }
          : item
      )
    );
  }

  // clear functionality
  function handleClearLists() {
    const confirmed = window.confirm("Are you sure you want to clear list?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToogleItems={handleToogleItem}
        onClearLists={handleClearLists}
      />
      <Stats items={items} />
    </div>
  );
}
