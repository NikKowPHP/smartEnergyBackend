import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ErcotMaster } from '../entities/ercot-master.entity';

@Injectable()
export class ErcotMasterService {
  constructor(
    @InjectRepository(ErcotMaster)
    private ercotMasterRepository: Repository<ErcotMaster>,
  ) {}

  async searchAddresses(searchTerm: string): Promise<ErcotMaster[]> {
    return this.ercotMasterRepository.find({
      where: {
        address: ILike(`%${searchTerm}%`),
      },
      select: ['address', 'city', 'state', 'zip'],
      take: 10, // Limit results for typeahead
    });
  }
} 