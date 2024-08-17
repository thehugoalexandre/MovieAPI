import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: CustomLoggerService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, headers } = req;
        const start = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            const duration = Date.now() - start;

            const user = req.user ? `User ID: ${req.user.id}, Email: ${req.user.email}` : 'Anonymous User';
            const userAgent = headers['user-agent'];
            const authHeader = headers['authorization'];

            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${duration}ms | User: ${user} | User-Agent: ${userAgent} | Authorization: ${authHeader}`
            );
        });

        next();
    }
}