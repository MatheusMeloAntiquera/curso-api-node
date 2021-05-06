import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from '@modules/products/typeorm/entities/Product';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class ShowProductService {
  productRepository: ProductRepository;
  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}
