// order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Order, OrderStatus } from './order.entity';
import { CustomerService } from '../customer/customer.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class OrderService {
  private orderRepository: Repository<Order>;

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly customerService: CustomerService,
    private readonly inventoryService: InventoryService,
  ) {
    // Initialize the repository from the DataSource
    this.orderRepository = this.dataSource.getRepository(Order);
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, products } = createOrderDto;

    // Fetch customer details
    const customer = await this.customerService.getCustomerDetails(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Validate product details
    for (const product of products) {
      const inventoryProduct = await this.inventoryService.getProductDetails(product.productId);
      if (!inventoryProduct) {
        throw new NotFoundException(`Product ${product.productId} not found`);
      }
    }

    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    return await this.orderRepository.save(order);
  }

  async updateOrderShipping(id: string, trackingCompany: string, trackingNumber: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.trackingCompany = trackingCompany;
    order.trackingNumber = trackingNumber;
    return await this.orderRepository.save(order);
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepository.remove(order);
  }
}
