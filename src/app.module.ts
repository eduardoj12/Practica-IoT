import { Module } from '@nestjs/common';
import { CiudadesControllerImpl  } from './Ciudades/adapters/controllers/Ciudades2.controller';
import { CiudadesServiceImpl } from './Ciudades/domain/services/Ciudades2.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [CiudadesControllerImpl ],
  providers: [
    {
      provide: 'CiudadesServiceImpl',
      useClass: CiudadesServiceImpl,
    }
  ],
})
export class AppModule {}

