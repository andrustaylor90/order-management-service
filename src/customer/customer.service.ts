import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {
    async getCustomerDetails(customerId: string): Promise<any> {
        return { id: customerId, name: 'McLean' };
    }
}