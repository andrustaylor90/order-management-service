import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InventoryService } from './inventory.service';

@Module({
  imports: [HttpModule],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
