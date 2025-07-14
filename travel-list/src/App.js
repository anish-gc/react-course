import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id){
    setItems((items)=> items.filter((item)=> item.id !== id));
  }

  function handleToggleItem(id){
    setItems((items)=> items.map((item)=> item.id === id ? { ...item, packed: !item.packed}: item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items}  onDeleteItem={handleDeleteItem} onToggleItem= {handleToggleItem} />
      <Stats  items ={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
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
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem , onToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem}  onToggleItem={onToggleItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItem , onToggleItem}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=> onToggleItem(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button onClick={()=> onDeleteItem(item.id)}>❌ </button>
    </li>
  );
}

function Stats({items}) {
  if (!items.length)
    return (
   <footer className="stats">
      <em>Start adding items to your bucket list</em>
    </footer>
  )

  const numberOfItems = items.length;
  const numberOfPackedItems = items.filter((item)=> item.packed).length;
  const percentage = Math.round((numberOfPackedItems / numberOfItems) * 100);
  return (
    <footer className="stats">
      {percentage === 100 ? "You got everything ready to go" : `
      You have ${numberOfItems} items on your list, and your already packed ${numberOfPackedItems} (${percentage}%)
      `}
    </footer>
  );
}


