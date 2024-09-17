import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { OrderStatus } from './order.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsArray()
  products: { productId: string; quantity: number }[];
}

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  trackingCompany?: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;
}
