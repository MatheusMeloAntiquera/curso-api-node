import { Request, Response, NextFunction } from 'express';
import { CreateProductService } from '../services/CreateProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { ShowProductService } from '../services/ShowProductService';
import { UpdateProductService } from '../services/UpdateProductService';
import { ListProductService } from './../services/ListProductService';

export class ProductController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const products = await new ListProductService().execute().catch(next);
    return response.json(products);
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { id } = request.params;
    const product = await new ShowProductService().execute({ id }).catch(next);
    return response.json(product);
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { name, price, quantity } = request.body;
    const product = await new CreateProductService()
      .execute({
        name,
        price,
        quantity,
      })
      .catch(next);
    return response.json(product);
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;
    const product = await new UpdateProductService()
      .execute({
        id,
        name,
        price,
        quantity,
      })
      .catch(next);
    return response.json(product);
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { id } = request.params;
    const product = await new DeleteProductService()
      .execute({ id })
      .catch(next);
    return response.json([]);
  }
}
