import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'order-consumer',
      brokers: ['localhost:9092'],
    });
    this.consumer = this.kafka.consumer({ groupId: 'order-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'orders', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const order = JSON.parse(message.value.toString());
        console.log(`Received message from topic ${topic}:`, order);
        // Process the order message
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
