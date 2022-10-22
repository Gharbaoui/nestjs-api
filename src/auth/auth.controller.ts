import { Body, Controller, Get, ParseIntPipe, Post } from "@nestjs/common";
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
    signup(
        @Body('email') email:string,
        @Body('password') pass: string
    )
    {
        console.log({email, pass});
        return this.authService.signup();
    }
}