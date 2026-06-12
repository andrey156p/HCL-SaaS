const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic healthcheck route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HCL SaaS Backend is running' });
});

// Mock route for testing deployment
app.get('/api/tenants', (req, res) => {
  res.json({
    data: [
      { id: 1, name: 'Hospital Alpha' },
      { id: 2, name: 'Clinic Beta' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
