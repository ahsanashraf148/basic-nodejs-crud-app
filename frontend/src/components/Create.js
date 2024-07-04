import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name };
    axios
      .post("http://localhost:3001/api/items", newItem)
      .then((response) => {
        console.log("Item created:", response.data);
        setName("");
        setMessage("Item created successfully!");
      })
      .catch((error) =>
        console.error("There was an error creating the item!", error)
      );
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Item</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Create;
