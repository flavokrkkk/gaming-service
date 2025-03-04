import { Controller, Get, Post, Body, Param, Req, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Profile } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUserByNextAuth(createUserDto);
  }

  @Get("by-email")
  findOne(@Query("email") email: Profile["email"]) {
    return this.userService.getCurrentProfile({ email });
  }
}
