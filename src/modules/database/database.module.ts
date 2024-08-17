import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<string>('DB_TYPE') as 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [__dirname + '/../**/*.entity.{ts,js}'],
                synchronize: configService.get<boolean>('DB_SYNC') || false,
                migrations: [__dirname + '/../migrations/*.{ts,js}'],
            }),
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }