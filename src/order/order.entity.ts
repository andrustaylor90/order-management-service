
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export enum OrderStatus {
  PROCESSING = 'processing',
  CANCELED = 'canceled',
  DELIVERED = 'delivered',
}

@Entity() // Ensure this decorator is present
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column('json')
  products: { productId: string; quantity: number }[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PROCESSING,
  })
  status: OrderStatus;

  @Column({ nullable: true })
  trackingCompany: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
