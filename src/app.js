const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Statikus fájlok kiszolgálása a src mappából
app.use(express.static(path.join(__dirname, 'src')));

// Ha szeretnéd, index.html-t is alapértelmezettként
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
  console.log(`Szerver fut: http://localhost:${port}`);
});