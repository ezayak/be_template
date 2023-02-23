import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestModule } from '@nestjs/common';
import { PreauthMiddlewear } from './auth/preauth.middlewear';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'smart-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreauthMiddlewear)
      .exclude({
        path: 'admin/users',
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: 'admin/*',
        method: RequestMethod.ALL,
      });
  }
}
