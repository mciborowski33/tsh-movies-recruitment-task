import dotenv from 'dotenv';

dotenv.config();

import { PORT } from 'config';

import app from './app';

app.listen(PORT, () => `Server is listening at http://localhost:${PORT}`);
