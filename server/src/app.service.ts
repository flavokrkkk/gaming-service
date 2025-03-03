import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { Server } from "@prisma/client";

@Injectable()
export class AppService {
  public constructor(private readonly prismaService: PrismaService) {}

  getHello(): Promise<Server[]> {
    return this.prismaService.server.findMany();
  }
}
