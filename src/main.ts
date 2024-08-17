import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SetupSwagger } from './swagger/setup-swagger';
// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: WinstonModule.createLogger({
    //   transports: [
    //     new winston.transports.Console(),
    //     new winston.transports.File({ filename: 'combined.log' }),
    //   ],
    // }),
  }
  );
  const configService = app.get(ConfigService);

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 500,
      message: {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'You have exceeded the 500 requests in 15 minutes limit!',
        nextRequest: 'Please try again after 15 minutes.',
      },
      headers: true,
    }),
  );

  const APP_PORT = configService.get<number>('APP_PORT') || 3000;
  const APP_NODE_ENV = configService.get<string>('APP_NODE_ENV') || 'development';
  const APP_VERSION = configService.get<string>('APP_VERSION') || '1.0.0';

  const validationPipe: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  };
  app.useGlobalPipes(new ValidationPipe(validationPipe));

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PATCH,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  };
  app.enableCors(corsOptions);

  app.setGlobalPrefix('v1');
  SetupSwagger(app, APP_VERSION);

  await app.listen(APP_PORT);

  const url = await app.getUrl();
  Logger.log('-----------------------------------------', 'Application');
  Logger.log(`Application is running on: ${url}`, 'Application');
  Logger.log(`API Documentation available at: ${url}/api`, 'Application');
  Logger.log(`Environment: ${APP_NODE_ENV}`, 'Application');
  Logger.log(`Application Version: ${APP_VERSION}`, 'Application');
  Logger.log('-----------------------------------------', 'Application');
}
bootstrap();