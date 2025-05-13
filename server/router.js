import express from 'express';

const app = express();
const apiRouter = express.Router();
app.use('/api', apiRouter);

app.use(express.json());

app.use((req, res, next) => {
  if (req && res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  }

  next();
});

export const router = app;
