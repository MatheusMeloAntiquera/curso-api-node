import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from '@modules/products/typeorm/entities/Product';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  productRepository: ProductRepository;
  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.productRepository.findByName(name);

    if (productExists && product.id !== productExists.id) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    this.productRepository.save(product);

    return product;
  }
}
