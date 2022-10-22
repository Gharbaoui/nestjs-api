import {Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config"
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}
    login()
    {
        return `login`;
    }


    async signup(dto: AuthDto)
    {
        // genreate password
        // store it in db
        const hash = await argon.hash(dto.password);
        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                hash
            },
            select: {
                email: true,
                id:true,
                createdAt: true
            }
        });
        return user;
    }

}