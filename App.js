const express = require('express');
const app = express();

// Example route
app.get('/', (req, res) => {
  res.send('Buildmitra backend API running!');
});

// Mount your controllers/routes as needed here
// Example:
// const userRoutes = require('../routes/userRoutes'); app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

