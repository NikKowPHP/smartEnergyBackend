import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ErcotMaster } from '../entities/ercot-master.entity';
import { AddressSuggestion } from '../common/types/ercot.types';

@Injectable()
export class ErcotMasterService {
  private readonly logger = new Logger(ErcotMasterService.name);

  constructor(
    @InjectRepository(ErcotMaster)
    private readonly ercotMasterRepository: Repository<ErcotMaster>,
  ) {}

  /**
   * Searches for addresses in the ErcotMaster database
   * @param searchTerm - The search term to query addresses
   * @returns Promise<AddressSuggestion[]> - Array of matching addresses
   * @throws NotFoundException if no addresses are found
   */
  public async searchAddresses(searchTerm: string): Promise<AddressSuggestion[]> {
    try {
      this.logger.debug(`Searching addresses with term: ${searchTerm}`);

      const addresses = await this.ercotMasterRepository.find({
        where: {
          address: ILike(`%${searchTerm}%`),
        },
        select: ['address', 'city', 'state', 'zip'],
        take: 10,
      });

      if (!addresses.length) {
        throw new NotFoundException('No addresses found matching the search term');
      }

      this.logger.debug(`Found ${addresses.length} matching addresses`);
      return addresses;
    } catch (error) {
      this.logger.error(`Error searching addresses: ${error.message}`, error.stack);
      throw error;
    }
  }
} 