import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CustomerResponseDto } from 'src/customer/dto/customer-response.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  /**
   * Creates a new customer record
   * @param customerData - The customer data to save
   * @returns Promise<Customer> - The created customer record
   * @throws BadRequestException if validation fails
   */
  public async createCustomer(customerData: CreateCustomerDto): Promise<CustomerResponseDto> {
    try {
      this.logger.debug(`Creating customer record for: ${customerData.company_name}`);
      
      const customer = this.customerRepository.create(customerData);
      const savedCustomer = await this.customerRepository.save(customer);
      
      this.logger.debug(`Successfully created customer with ID: ${savedCustomer.id}`);
      return {
        success: true,
        message: 'Customer created successfully',
        customerId: savedCustomer.id,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      this.logger.error(`Error creating customer: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create customer record');
    }
  }
}