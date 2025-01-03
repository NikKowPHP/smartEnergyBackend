import { IsString, IsNotEmpty, IsEmail, IsDate, IsNumber, IsPhoneNumber, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Customer phone number',
    example: '(713) 555-0123'
  })
  @IsPhoneNumber('US')
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'contact@company.com'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Tech Corporation'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  readonly company_name: string;

  @ApiProperty({
    description: 'Street address',
    example: '123 Main St'
  })
  @IsString()
  @IsNotEmpty()
  readonly address_street: string;

  @ApiProperty({
    description: 'City',
    example: 'Houston'
  })
  @IsString()
  @IsNotEmpty()
  readonly address_city: string;

  @ApiProperty({
    description: 'State',
    example: 'TX'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  readonly address_state: string;

  @ApiProperty({
    description: 'ZIP code',
    example: '77001'
  })
  @IsString()
  @IsNotEmpty()
  readonly address_zip: string;

  @ApiProperty({
    description: 'Contract end date',
    example: '2025-12-31'
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  readonly contract_end_date: Date;

  @ApiProperty({
    description: 'Energy provider name',
    example: 'Texas Energy Co'
  })
  @IsString()
  @IsNotEmpty()
  readonly energy_provider: string;

  @ApiProperty({
    description: 'Monthly bill amount',
    example: 2500.75
  })
  @IsNumber()
  @IsNotEmpty()
  readonly monthly_bill: number;
}