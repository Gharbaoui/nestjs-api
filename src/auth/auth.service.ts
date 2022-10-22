import { ConfigurableModuleBuilder, Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config"


@Injectable({})
export class AuthService {
    constructor(private readonly configModule: ConfigService) {}
    login()
    {
        return `login with ${this.configModule.get<string>('DB_USER')}`;
    }


    signup()
    {
        return `signup`;
    }

}