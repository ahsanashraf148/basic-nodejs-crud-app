import React, { useState } from 'react';
import axios from 'axios';

function Update() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/items/${id}`, { name })
      .then(response => {
        console.log('Item updated:', response.data);
        setId('');
        setName('');
        setMessage("Item updated");
      })
      .catch(error => console.error('There was an error updating the item!', error));
      setMessage("");
    };
    
    return (
        <div>
    <form onSubmit={handleSubmit}>
      <h2>Update Item</h2>
      <input
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="Item ID"
        required
        />
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New Item Name"
        required
        />
      <button type="submit">Update</button>
    </form>
    {message && <p>{message}</p>}
    </div>
  );
}

export default Update;
