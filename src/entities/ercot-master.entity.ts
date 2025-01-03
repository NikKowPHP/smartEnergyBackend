import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@Entity('ErcotMaster')
export class ErcotMaster {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Index('IX_ErcotMaster_Address')
  @Column({ type: 'nvarchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  address: string;

  @Column({ type: 'nvarchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  city: string;

  @Column({ type: 'nvarchar', length: 2 })
  @IsString()
  @IsNotEmpty()
  state: string;

  @Column({ type: 'nvarchar', length: 10 })
  @IsString()
  @IsNotEmpty()
  zip: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @IsString()
  @IsOptional()
  ESIId?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @IsString()
  @IsOptional()
  MeterType?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @IsString()
  @IsOptional()
  PremiseType?: string;
}