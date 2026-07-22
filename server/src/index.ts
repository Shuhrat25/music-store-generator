import express from 'express';
import cors from 'cors';
import { generateSongBatch } from './generator.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/songs', (req, res) => {
  const region = (req.query.region as string) || 'en_US';
  const seed = (req.query.seed as string) || '0';
  const likes = parseFloat((req.query.likes as string) || '0');
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);

  const songs = generateSongBatch(region, seed, likes, page, limit);

  res.json(songs);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});