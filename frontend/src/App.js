import React from 'react';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Delete from './components/Delete';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD Application</h1>
      </header>
      <main>
        <div className="left-side">
          <Create />
          <Read />
        </div>
        <div className="right-side">
          <Update />
          <Delete />
        </div>
      </main>
    </div>
  );
}

export default App;
