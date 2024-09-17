import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { InventoryModule } from './inventory/inventory.module';
// import { Order } from './order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'order_management',
      // entities: [Order],
      autoLoadEntities: true,
      synchronize: true, // Turn off in production!
    }),
    OrderModule,
    CustomerModule,
    InventoryModule,
  ],
})
export class AppModule {}
