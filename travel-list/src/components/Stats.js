

export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding items to your bucket list</em>
      </footer>
    );

  const numberOfItems = items.length;
  const numberOfPackedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((numberOfPackedItems / numberOfItems) * 100);
  return (
    <footer className="stats">
      {percentage === 100
        ? "You got everything ready to go"
        : `
      You have ${numberOfItems} items on your list, and your already packed ${numberOfPackedItems} (${percentage}%)
      `}
    </footer>
  );
}
