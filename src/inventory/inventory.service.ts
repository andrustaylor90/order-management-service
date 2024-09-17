import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, retryWhen, delay, take, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class InventoryService {
  constructor(private readonly httpService: HttpService) {}

  async getProductDetails(productId: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://api.order-management.com/products/${productId}`).pipe(
          retryWhen(errors => errors.pipe(delay(1000), take(3))),
          catchError((error: AxiosError) => {
            throw new Error(`Error fetching product details: ${error.message}`);
          }),
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch product details after retries: ${error.message}`);
    }
  }
}
