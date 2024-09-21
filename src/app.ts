import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';

import { ALLOWED_ORIGINS, IS_DEVELOPMENT, PORT } from 'config';
import { initialize } from 'db';
import apiRouter from 'routes';

dotenv.config();
const app = express();

app.use(cors({ origin: IS_DEVELOPMENT ? '*' : ALLOWED_ORIGINS }));
app.use(helmet());
app.use(express.json({ limit: '1kb' }));

app.use(hpp());
app.disable('x-powered-by');

initialize();

app.get('/api/check', (_req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  return console.log(`Server is listening at http://localhost:${PORT}`);
});
