import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Completar informe',
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  readonly title: string;

  @ApiPropertyOptional({
    description: 'Descripción de la tarea',
    example: 'Completar el informe mensual de ventas',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  readonly description?: string;
}