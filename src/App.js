import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: true,
    message: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Display Alert
      showAlert(true, 'danger', 'Please enter a valid Value');
    } else if (name && isEditing) {
      // Deal with Edit
    } else {
      // Show Alert
      showAlert(true, 'success', 'Item added tothe list');
      // Add the Item to List
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', message = '') => {
    setAlert({ show, message, type });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty List');
    setList([]);
  };

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button onClick={clearList} className="clear-btn">
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
