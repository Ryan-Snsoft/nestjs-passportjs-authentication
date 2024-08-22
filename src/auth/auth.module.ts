import { Module, Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { EtcdService } from 'src/etcd/etcd.service';
import { EtcdModule } from 'src/etcd/etcd.module';

// Provider for 'ETCD_SECRET'
const EtcdSecretProvider: Provider = {
  provide: 'ETCD_SECRET',
  useFactory: async (etcdService: EtcdService) => {
    return await etcdService.getJWTSecret();
  },
  inject: [EtcdService],
};
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    EtcdModule,
    JwtModule.registerAsync({
      imports: [EtcdModule],
      inject: [EtcdService, ConfigService],
      useFactory: async (etcdService: EtcdService, config: ConfigService) => {
        const secret = await etcdService.getJWTSecret();
        return {
          secret,
          signOptions: {
            expiresIn: config.get<string | number> ('JWT_EXPIRE')
          }
        }
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, EtcdSecretProvider],
  controllers: [AuthController]
})
export class AuthModule {}
