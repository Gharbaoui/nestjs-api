import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get(`/login`)
    login(@Body() dto: AuthDto)
    {
        return this.authService.login(dto);
    }

    @Post('signup')
    signup(@Body() dto: AuthDto)
    {
        return this.authService.signup(dto);
    }
}