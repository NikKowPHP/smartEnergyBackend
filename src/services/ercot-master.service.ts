import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ErcotMaster } from '../entities/ercot-master.entity';
import { AddressSuggestion } from '../common/types/ercot.types';
import { sanitizeInput } from '../common/utils/sanitizer';

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
      // Sanitize and validate search term
      const sanitizedTerm = sanitizeInput(searchTerm);
      
      if (!sanitizedTerm || sanitizedTerm.length < 3) {
        throw new BadRequestException('Search term must be at least 3 characters long');
      }

      this.logger.debug(`Searching addresses with sanitized term: ${sanitizedTerm}`);

      const addresses = await this.ercotMasterRepository.find({
        where: {
          address: ILike(`%${sanitizedTerm}%`),
        },
        select: ['address', 'city', 'state', 'zip'],
        take: 10,
        cache: true,
      });

      if (!addresses.length) {
        throw new NotFoundException('No addresses found matching the search term');
      }

      // Sanitize output data
      const sanitizedAddresses = addresses.map(addr => ({
        address: sanitizeInput(addr.address),
        city: sanitizeInput(addr.city),
        state: sanitizeInput(addr.state),
        zip: sanitizeInput(addr.zip)
      }));

      this.logger.debug(`Found ${sanitizedAddresses.length} matching addresses`);
      return sanitizedAddresses;
    } catch (error) {
      this.logger.error(`Error searching addresses: ${error.message}`, error.stack);
      throw error;
    }
  }
} 