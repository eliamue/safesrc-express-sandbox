import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import resourceController from './controllers/resources.js';
import stateController from './controllers/states.js';
import cityController from './controllers/cities.js';
import categoryController from './controllers/categories.js';

const app = express();

app.use(express.json());

app.use('/api/v1/resources', resourceController);
app.use('/api/v1/states', stateController);
app.use('/api/v1/cities', cityController);
app.use('/api/v1/categories', categoryController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
