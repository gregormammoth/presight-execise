import express from 'express';
const app = express();
const port = 3001;

import { router } from './router.js';
import './modules/index.js';

app.use(router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});