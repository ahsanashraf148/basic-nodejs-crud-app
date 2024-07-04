import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Read() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('There was an error fetching the items!', error));
  }, []);

  return (
    <div>
      <h2>Read Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} {item.id}</li> 
        ))}
      </ul>
    </div>
  );
}

export default Read;
