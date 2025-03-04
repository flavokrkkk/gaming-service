import { IsEmail, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
  @IsString()
  id: string;
  @IsEmail()
  @IsString()
  email?: string;
  @IsString()
  name?: string | null;

  @IsUrl()
  @IsString()
  image?: string | null;
}
