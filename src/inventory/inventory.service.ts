import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  async getProductDetails(productId: string): Promise<any> {
    return { id: productId, name: 'Product Name', stock: 100 };
  }
}
