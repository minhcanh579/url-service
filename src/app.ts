import 'dotenv/config';
import express, { Express } from 'express';
import serversRouter from './routes/server';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './swagger.config';

const app: Express = express();

app.use(express.json());

app.use('/api', serversRouter);

setupSwagger(app);

app.use(errorHandler);

const PORT: number  = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});