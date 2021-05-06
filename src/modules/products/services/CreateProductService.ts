import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import { Product } from '@modules/products/typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  productRepository: ProductRepository;
  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const product = this.productRepository.create({
      name,
      price,
      quantity,
    });

    await this.productRepository.save(product);

    return product;
  }
}
