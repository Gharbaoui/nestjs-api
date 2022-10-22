import {Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config"
import { PrismaService } from "src/prisma/prisma.service";


@Injectable({})
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}
    login()
    {
        return `login`;
    }


    signup()
    {
        return `signup`;
    }

}