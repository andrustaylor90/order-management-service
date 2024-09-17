import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Correct import for HttpModule
import { CustomerService } from './customer.service';

@Module({
  imports: [HttpModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
