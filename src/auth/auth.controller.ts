import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser, Public } from '../common/decorator';
import { RtGuard } from '../common/guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { JwtRefreshPayload, Tokens } from './type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('sub') id: string) {
    return this.authService.logout(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@GetUser() user: JwtRefreshPayload) {
    return this.authService.refreshToken(user.sub, user.refreshToken);
  }
}
