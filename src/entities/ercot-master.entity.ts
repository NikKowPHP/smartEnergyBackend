import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity('ErcotMaster')
export class ErcotMaster {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly zip: string;
}