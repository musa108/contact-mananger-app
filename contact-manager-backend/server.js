const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;








let contacts = [];

app.use(bodyParser.json());
app.use(cors());

// Get all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Add a new contact
app.post('/contacts', (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  res.json(newContact);
});

// Edit a contact
app.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const updatedContact = req.body;
  contacts[id] = updatedContact;
  res.json(updatedContact);
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const deletedContact = contacts[id];
  contacts = contacts.filter((_, index) => index != id);
  res.json(deletedContact);
});

app.use((req, res, next) => {
  console.log(`Received a request to ${req.url}`);
  next();
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
