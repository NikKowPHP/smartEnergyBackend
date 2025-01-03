import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CustomerResponseDto } from '../customer/dto/customer-response.dto';
import { EncryptionService } from '../common/utils/encryption.service';
import { sanitizeInput } from '../common/utils/sanitizer';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Creates a new customer record
   * @param customerData - The customer data to save
   * @returns Promise<Customer> - The created customer record
   * @throws BadRequestException if validation fails
   */
  public async createCustomer(customerData: CreateCustomerDto): Promise<CustomerResponseDto> {
    try {
      this.logger.debug(`Creating customer record for: ${sanitizeInput(customerData.company_name)}`);
      
      // Encrypt sensitive data
      const sanitizedAndEncryptedData = {
        ...customerData,
        phone: this.encryptionService.encrypt(sanitizeInput(customerData.phone)),
        email: this.encryptionService.encrypt(sanitizeInput(customerData.email)),
        company_name: sanitizeInput(customerData.company_name),
        address_street: sanitizeInput(customerData.address_street),
        address_city: sanitizeInput(customerData.address_city),
        address_state: sanitizeInput(customerData.address_state),
        address_zip: sanitizeInput(customerData.address_zip),
        energy_provider: sanitizeInput(customerData.energy_provider),
      };

      const customer = this.customerRepository.create(sanitizedAndEncryptedData);
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