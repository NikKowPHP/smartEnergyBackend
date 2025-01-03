import { 
  Controller, 
  Post, 
  Body, 
  UseInterceptors, 
  ValidationPipe, 
  Logger 
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Controller('customer')
@UseInterceptors(LoggingInterceptor)
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  /**
   * POST /customer/submit
   * Creates a new customer record
   */
  @Post('submit')
  public async createCustomer(
    @Body(new ValidationPipe({ transform: true })) customerData: CreateCustomerDto,
  ): Promise<Customer> {
    this.logger.log(`Received customer creation request for: ${customerData.company_name}`);
    return this.customerService.createCustomer(customerData);
  }
}