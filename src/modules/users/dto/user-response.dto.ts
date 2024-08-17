import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: '1', description: 'The unique identifier of the user' })
    id: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    name: string;

    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ description: 'The date the user was created' })
    createdAt: Date;

    @ApiProperty({ description: 'The date the user was last updated' })
    updatedAt: Date;
}
