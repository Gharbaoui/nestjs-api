import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get(`/login`)
    login()
    {
        return this.authService.login();
    }

    @Post('signup')
    signup(@Body() dto: AuthDto)
    {
        console.log({dto});
        return this.authService.signup();
    }
}