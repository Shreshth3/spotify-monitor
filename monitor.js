const express = require('express');
require('dotenv').config();

const PORT = 3000;
const app = express();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', function (req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent('http://localhost:3000/hello'),
  );
});
