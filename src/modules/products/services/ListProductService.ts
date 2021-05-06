import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from '@modules/products/typeorm/entities/Product';

export class ListProductService {
  productRepository: ProductRepository;
  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  public async execute(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}
