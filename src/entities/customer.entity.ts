import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, IsDate, IsNumber, IsPhoneNumber } from 'class-validator';

@Entity('CustomerData')
export class Customer {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  @IsString()
  @IsPhoneNumber('US')
  @IsNotEmpty()
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  address_street: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  address_city: string;

  @Column({ type: 'varchar', length: 2 })
  @IsString()
  @IsNotEmpty()
  address_state: string;

  @Column({ type: 'varchar', length: 10 })
  @IsString()
  @IsNotEmpty()
  address_zip: string;

  @Column({ type: 'date' })
  @IsDate()
  @IsNotEmpty()
  contract_end_date: Date;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  energy_provider: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @IsNotEmpty()
  monthly_bill: number;
}