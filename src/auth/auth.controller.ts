import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get(`/login`)
    login()
    {
        return this.authService.login();
    }

    @Get('/signup')
    signup()
    {
        return this.authService.signup();
    }
}