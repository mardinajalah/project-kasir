import express from 'express';
import cors from 'cors';
import routeProducts from './router/product.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', routeProducts);

export default app;
