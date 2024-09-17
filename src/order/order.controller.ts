import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { OrderStatus } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Patch(':id/shipping')
  updateOrderShipping(
    @Param('id') id: string,
    @Body('trackingCompany') trackingCompany: string,
    @Body('trackingNumber') trackingNumber: string,
  ) {
    return this.orderService.updateOrderShipping(id, trackingCompany, trackingNumber);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
