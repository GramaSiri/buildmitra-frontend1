import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Buildmitra backend API running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
