import {ForbiddenException, Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config"
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}
    async login(dto: AuthDto)
{
    const user = await this.prismaService.user.findUnique({
        where: {
            email: dto.email
        }
    });
    if (!user)
        throw new ForbiddenException(`credentials incorrect {email}!`);
    
    const pwCheck = await argon.verify(user.hash, dto.password);
    if (!pwCheck)
        throw new ForbiddenException(`credentials incorrect {password}!`);

    delete user.hash;
    return user;
    }


    async signup(dto: AuthDto)
    {
        // genreate password
        // store it in db
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            });
            delete user.hash;
            return user;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                return `this email is already in use!!`
            }
        }
    }

}