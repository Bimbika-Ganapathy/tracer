const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Tracker is running');
});

app.get('/track.png', (req, res) => {
  const log = `${new Date().toISOString()} - ${req.ip} - ${req.headers['user-agent']}`;
  console.log('Pixel Hit:', log);  // <-- New line to instantly log hits
  fs.appendFileSync('views.log', log + '\n');

  const pixel = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
    'base64'
  );
  res.set('Content-Type', 'image/png');
  res.send(pixel);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
