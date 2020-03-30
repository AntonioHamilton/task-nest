import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  responsible: string;

  @IsNotEmpty()
  date: string;
}

export class TaskDTOUpdate {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  responsible: string;

  @IsOptional()
  date: string;
}
