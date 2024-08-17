import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());

  const APP_PORT = configService.get<number>('APP_PORT') || 3000;
  const NODE_ENV = configService.get<string>('NODE_ENV') || 'development';
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

  app.set('trust proxy', true);
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setVersion(APP_VERSION)
    .setTitle('Movie API').setDescription('The Movie API documentation')
    .addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { jsonDocumentUrl: '/swagger/json', });

  await app.listen(APP_PORT);

  const url = await app.getUrl();
  Logger.log('-----------------------------------------', 'Application');
  Logger.log(`Application is running on: ${url}`, 'Application');
  Logger.log(`API Documentation available at: ${url}/api`, 'Application');
  Logger.log(`Environment: ${NODE_ENV}`, 'Application');
  Logger.log(`Application Version: ${APP_VERSION}`, 'Application');
  Logger.log('-----------------------------------------', 'Application');
}
bootstrap();