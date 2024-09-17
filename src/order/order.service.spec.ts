import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

describe('OrderService', () => {
  let service: OrderService;
  let repo: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repo = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const orderDto = { customerId: '12345', products: [{ productId: 'prod-1', quantity: 2 }] };
    jest.spyOn(repo, 'create').mockReturnValue(orderDto as any);
    jest.spyOn(repo, 'save').mockResolvedValue(orderDto as any);

    const result = await service.createOrder(orderDto as any);
    expect(result).toEqual(orderDto);
  });
});
