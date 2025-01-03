import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, IsDate, IsNumber, IsPhoneNumber } from 'class-validator';

@Entity('CustomerData')
export class Customer {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({ 
    type: 'varchar',
    length: 20,
    nullable: false 
  })
  @IsString()
  @IsPhoneNumber('US')
  @IsNotEmpty()
  phone: string;

  @Column({ 
    type: 'varchar',
    length: 255,
    nullable: false 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ 
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'company_name'
  })
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @Column({ 
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'address_street'
  })
  @IsString()
  @IsNotEmpty()
  address_street: string;

  @Column({ 
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'address_city'
  })
  @IsString()
  @IsNotEmpty()
  address_city: string;

  @Column({ 
    type: 'varchar',
    length: 2,
    nullable: false,
    name: 'address_state'
  })
  @IsString()
  @IsNotEmpty()
  address_state: string;

  @Column({ 
    type: 'varchar',
    length: 10,
    nullable: false,
    name: 'address_zip'
  })
  @IsString()
  @IsNotEmpty()
  address_zip: string;

  @Column({ 
    type: 'date',
    nullable: false,
    name: 'contract_end_date'
  })
  @IsDate()
  @IsNotEmpty()
  contract_end_date: Date;

  @Column({ 
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'energy_provider'
  })
  @IsString()
  @IsNotEmpty()
  energy_provider: string;

  @Column({ 
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    name: 'monthly_bill'
  })
  @IsNumber()
  @IsNotEmpty()
  monthly_bill: number;
}