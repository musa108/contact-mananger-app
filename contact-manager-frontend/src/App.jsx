// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the Tailwind CSS file

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const addContact = async () => {
    try {
      await axios.post('http://localhost:3001/contacts', newContact);
      setNewContact({ name: '', email: '', phone: '' });
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const startEditingContact = (id) => {
    setEditingContact(id);
  };

  const cancelEditingContact = () => {
    setEditingContact(null);
  };

  const saveEditedContact = async (id) => {
    const editedContact = {
      name: document.getElementById(`name_${id}`).value,
      email: document.getElementById(`email_${id}`).value,
      phone: document.getElementById(`phone_${id}`).value,
    };

    try {
      await axios.put(`http://localhost:3001/contacts/${id}`, editedContact);
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8">Contact Manager</h1>
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Add New Contact</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newContact.name}
          onChange={handleInputChange}
          className="p-2 border border-gray-400 mr-2"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={newContact.email}
          onChange={handleInputChange}
          className="p-2 border border-gray-400 mr-2"
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={newContact.phone}
          onChange={handleInputChange}
          className="p-2 border border-gray-400 mr-2"
        />
        <button
          onClick={addContact}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Contact
        </button>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Contact List</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="mb-4 p-4 border border-gray-400 flex justify-between items-center"
            >
              {editingContact === index ? (
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    id={`name_${index}`}
                    defaultValue={contact.name}
                    className="p-2 border border-gray-400 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    id={`email_${index}`}
                    defaultValue={contact.email}
                    className="p-2 border border-gray-400 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    id={`phone_${index}`}
                    defaultValue={contact.phone}
                    className="p-2 border border-gray-400 mr-2"
                  />
                  <button
                    onClick={() => saveEditedContact(index)}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditingContact}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold">{contact.name}</p>
                  <p className="text-gray-600">{contact.email}</p>
                  <p className="text-gray-600">{contact.phone}</p>
                </div>
              )}
              <div>
                <button
                  onClick={() => startEditingContact(index)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteContact(index)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
