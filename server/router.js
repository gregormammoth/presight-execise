import express from 'express';

const app = express();
const apiRouter = express.Router();
app.use('/api', apiRouter);

app.use(express.json());

app.use((req, res, next) => {
  if (req && res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  next();
});

export const router = app;
