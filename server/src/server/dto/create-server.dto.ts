import { IsString, IsOptional, IsUrl } from "class-validator";

export class CreateServerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
