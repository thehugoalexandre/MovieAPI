import { Request } from 'express';
import { SignUpDto } from '../modules/auth/dto/signUp.dto';
import { JwtPayload } from '../modules/auth/interfaces/jwt-payload.interface';

declare global {
    namespace Express {
        export interface Request {
            user?: Partial<JwtPayload>;
        }
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}
