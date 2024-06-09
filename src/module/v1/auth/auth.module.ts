import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ENVIRONMENT } from '../../../common/configs/environment';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OtpModule } from '../otp/otp.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: ENVIRONMENT.JWT.SECRET,
        signOptions: { expiresIn: '1d' },
      }),
      global: true,
    },
    UserModule,
    OtpModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
