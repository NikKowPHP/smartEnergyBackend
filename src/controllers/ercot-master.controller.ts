import { Controller, Get, Query } from '@nestjs/common';
import { ErcotMasterService } from '../services/ercot-master.service';

@Controller('ercot-master')
export class ErcotMasterController {
  constructor(private readonly ercotMasterService: ErcotMasterService) {}

  @Get('search')
  async searchAddresses(@Query('search') searchTerm: string) {
    return this.ercotMasterService.searchAddresses(searchTerm);
  }
} 