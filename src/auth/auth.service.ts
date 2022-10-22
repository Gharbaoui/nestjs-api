import {Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config"
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

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