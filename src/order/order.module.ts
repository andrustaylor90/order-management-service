import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { CustomerModule } from '../customer/customer.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CustomerModule,
    InventoryModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
