import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { InventoryModule } from './inventory/inventory.module';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: +configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'postgres'),
        password: configService.get('DATABASE_PASSWORD', 'postgres'),
        database: configService.get('DATABASE_NAME', 'order_management'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     store: redisStore,
    //     host: configService.get('REDIS_HOST', 'localhost'),
    //     port: +configService.get<number>('REDIS_PORT', 6379),
    //     ttl: 60, // Time to live in seconds
    //   }),
    // }),
    RateLimiterModule.register({
      points: 5, // Number of requests
      duration: 60, // Per second
    }),
    OrderModule,
    CustomerModule,
    InventoryModule,
  ],
  providers: [KafkaProducerService, KafkaConsumerService],
})
export class AppModule {}
