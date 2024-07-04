import React, { useState } from 'react';
import axios from 'axios';

function Delete() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/api/items/${id}`)
      .then(response => {
        console.log('Item deleted:', response.data);
        setId('');
        setMessage("Item deleted");
      })
      .catch(error => console.error('There was an error deleting the item!', error));
    setMessage("");
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Delete Item</h2>
      <input
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="Item ID"
        required
      />
      <button type="submit">Delete</button>
    </form>
    {message && <p>{message}</p>}
    </div>
  );
}

export default Delete;
