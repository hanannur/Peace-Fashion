import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Temporary test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

export default app;
