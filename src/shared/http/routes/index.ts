import productsRouter from '@modules/products/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/', (_req, res) => {
  return res.json({ message: 'teste' });
});

export default routes;
