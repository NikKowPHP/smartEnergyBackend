import { IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddressSearchDto {
  @ApiProperty({
    description: 'Search term for address lookup',
    minLength: 2,
    maxLength: 100,
    example: '123 Main St'
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  readonly search: string;
} 