import { Module } from '@nestjs/common';
import { CiudadesControllerImpl  } from './Ciudades/adapters/controllers/Ciudades2.controller';
import { CiudadesServiceImpl } from './Ciudades/domain/services/Ciudades2.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadesEntity } from './Ciudades/domain/entities/ciudades.entity'


@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://eduardoj:4muce2001@cluster0.kkrzcn8.mongodb.net/?retryWrites=true&w=majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true, // Solo para desarrollo
      logging: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CiudadesEntity])
  ],
  controllers: [CiudadesControllerImpl],
  providers: [
    {
      provide: 'CiudadesServiceImpl',
      useClass: CiudadesServiceImpl,
    }
  ],
})
export class AppModule {}

