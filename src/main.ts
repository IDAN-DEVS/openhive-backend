import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/filter';
import { ENVIRONMENT } from './common/configs/environment';
import { ResponseTransformerInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  app.use(helmet());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  /**
   * interceptors
   */
  app.useGlobalInterceptors(new ResponseTransformerInterceptor(app.get(Reflector)));

  /**
   * Set global exception filter
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * Set global prefix for routes
   */
  app.setGlobalPrefix('/api');

  /**
   *  Set global pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(ENVIRONMENT.APP.PORT);
}
bootstrap();
