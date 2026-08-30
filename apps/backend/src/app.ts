import express from 'express';
import cors from 'cors';
import routeProducts from './router/product.route';
import routeUser from "./router/user.route";
import routeAuth from "./router/auth.route";
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// configure express
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', routeAuth);
app.use('/api/product', routeProducts);
app.use('/api/user', routeUser);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
