const express = require('express');
const router = express.Router();
const { clients, uuidv4 } = require('../data/store');

// POST /api/clients - Register a new client
router.post('/', (req, res) => {
  const { firstName, lastName, dateOfBirth, phone, email, address, city, zipCode, householdSize, dietaryRestrictions, notes } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !address || !city || !zipCode || !householdSize) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newClient = {
    id: `CLI-${uuidv4().slice(0, 6).toUpperCase()}`,
    firstName,
    lastName,
    dateOfBirth,
    phone: phone || '',
    email: email || '',
    address,
    city,
    zipCode,
    householdSize: parseInt(householdSize, 10),
    dietaryRestrictions: dietaryRestrictions || '',
    notes: notes || '',
    lastVisit: new Date().toISOString().slice(0, 10),
    visits: [new Date().toISOString().slice(0, 10)],
  };

  clients.push(newClient);
  res.status(201).json({ clientId: newClient.id, message: 'Client registered successfully' });
});

// GET /api/clients/search - Search for clients
router.get('/search', (req, res) => {
  const { name, phone, id } = req.query;

  let results = [];

  if (id) {
    results = clients.filter((c) => c.id.toLowerCase() === id.toLowerCase());
  } else if (phone) {
    results = clients.filter((c) => c.phone.replace(/\D/g, '').includes(phone.replace(/\D/g, '')));
  } else if (name) {
    const lower = name.toLowerCase();
    results = clients.filter(
      (c) =>
        c.firstName.toLowerCase().includes(lower) ||
        c.lastName.toLowerCase().includes(lower) ||
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(lower)
    );
  }

  res.json({ clients: results });
});

// POST /api/clients/:id/checkin - Check in an existing client
router.post('/:id/checkin', (req, res) => {
  const client = clients.find((c) => c.id === req.params.id);
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const today = new Date().toISOString().slice(0, 10);
  client.lastVisit = today;
  client.visits.push(today);

  res.json({ message: 'Check-in successful', clientId: client.id });
});

module.exports = router;
