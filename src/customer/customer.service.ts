import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, retryWhen, delay, take, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CustomerService {
  constructor(private readonly httpService: HttpService) {}

  async getCustomerDetails(customerId: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://api.order-management.com/customers/${customerId}`).pipe(
          retryWhen(errors => errors.pipe(delay(1000), take(3))), // Retry 3 times with 1 second delay
          catchError((error: AxiosError) => {
            throw new Error(`Error fetching customer details: ${error.message}`);
          }),
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch customer details after retries: ${error.message}`);
    }
  }
}
