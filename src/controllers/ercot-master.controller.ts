import { 
  Controller, 
  Get, 
  Query, 
  UseInterceptors, 
  ValidationPipe, 
  Logger 
} from '@nestjs/common';
import { ErcotMasterService } from '../services/ercot-master.service';
import { AddressSearchDto } from '../dto/address-search.dto';
import { AddressSuggestion } from '../common/types/ercot.types';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Controller('ercot-master')
@UseInterceptors(LoggingInterceptor)
export class ErcotMasterController {
  private readonly logger = new Logger(ErcotMasterController.name);

  constructor(private readonly ercotMasterService: ErcotMasterService) {}

  /**
   * GET /ercot-master/search
   * Returns address suggestions based on search term
   */
  @Get('search')
  public async searchAddresses(
    @Query(new ValidationPipe({ transform: true })) query: AddressSearchDto,
  ): Promise<AddressSuggestion[]> {
    this.logger.log(`Received address search request with term: ${query.search}`);
    return this.ercotMasterService.searchAddresses(query.search);
  }
} 