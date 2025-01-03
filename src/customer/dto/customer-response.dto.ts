import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({
    description: 'Operation success status',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Customer created successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Customer ID',
    example: 1
  })
  customerId: number;

  @ApiProperty({
    description: 'Timestamp of the operation',
    example: '2024-03-20T10:30:00Z'
  })
  timestamp: string;
}