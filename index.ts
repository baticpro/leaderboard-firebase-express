import * as express from 'express';
import { Leader } from './src/types';

const app = express();

// get all
app.get('/leaders', async (req, res) => {});

// set leader
app.post('/leaders/set/:id', async (req, res) => {
  const { id } = req.params;
  const data: Leader = { ...req.body };
  data.deviceId = id;
});

app.listen(3000, () => {
  console.log('available on http://localhost:3000');
});
