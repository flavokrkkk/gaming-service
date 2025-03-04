import { Controller, Get, Post, Body, Param, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Profile } from "@prisma/client";
import { Request } from "express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const sessionToken = req.cookies?.["next-auth.session-token"];
    console.log("Session token from cookies:", sessionToken);
    return this.userService.createUserByNextAuth(createUserDto);
  }

  @Get(":profileId")
  findOne(@Param("profileId") profileId: Profile["id"], @Req() req: Request) {
    const sessionToken = req.cookies?.["next-auth.session-token"];
    console.log("Session token from cookies:", sessionToken);
    return this.userService.getCurrentProfile({ profileId });
  }
}
