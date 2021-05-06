import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class DeleteProductService {
  productRepository: ProductRepository;
  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    await this.productRepository.remove(product);
  }
}
