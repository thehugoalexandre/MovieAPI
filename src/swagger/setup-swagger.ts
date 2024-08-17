import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function SetupSwagger(app: INestApplication, version: string) {
    const config = new DocumentBuilder()
        .setTitle('Movie API')
        .setDescription('Backend Coding Challenge: NestJS Movie API -  Movie API documentation')
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, { jsonDocumentUrl: '/swagger/json', });
}
