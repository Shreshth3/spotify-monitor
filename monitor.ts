import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const app = express();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/login', function (req: Request, res: Response) {
  var scopes = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent('http://localhost:3000/token'),
  );
});

app.get('/token', async (req: Request, res: Response) => {
  const url = 'https://accounts.spotify.com/api/token';
  const body = {
    grant_type: '',
    code: '',
    redirect_uri: 'http://localhost:3000/hello',
  };

  await axios.post(url, body);
});
app.get('/playlist', async (req: Request, res: Response) => {
  const url = 'https://api.spotify.com/v1/me/playlists';

  try {
    const playlist = await axios.get(url);

    return res.json(playlist);
  } catch (error) {
    console.error(`Error is ${error}`);
    return res.sendStatus(500);
  }
});
