import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { customRoles } from "./libs/customUsernames";
import { Profile } from "@prisma/client";

@Injectable()
export class UserService {
  public customRoles: Array<string> = customRoles;

  constructor(private readonly prismaService: PrismaService) {}

  private generateUsername(): string {
    const randomRole =
      this.customRoles[Math.floor(Math.random() * this.customRoles.length)];
    const randomNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `Strife${randomRole}#${randomNumber}`;
  }

  private async generateUniqueUsername(): Promise<string> {
    let username = this.generateUsername();
    let isUnique = false;

    while (!isUnique) {
      const existingProfile = await this.prismaService.profile.findUnique({
        where: { username: username },
      });
      if (!existingProfile) {
        isUnique = true;
      } else {
        username = this.generateUsername();
      }
    }

    return username;
  }

  async createUserByNextAuth(user: CreateUserDto) {
    if (!user) return null;

    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return profile;
    }

    const uniqueUsername = await this.generateUniqueUsername();

    const newProfile = await this.prismaService.profile.create({
      data: {
        userId: user.id,
        username: uniqueUsername,
        name: user.name ?? "unknown",
        imageUrl: user.image ?? "",
        email: user.email ?? "",
      },
    });
    return newProfile;
  }

  public async getCurrentProfile({ profileId }: { profileId: Profile["id"] }) {
    if (!profileId) throw new BadRequestException("Profile id is required!");

    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: profileId,
      },
    });

    if (!profile)
      throw new InternalServerErrorException("Internal Server Error!");

    return profile;
  }
}
