import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { AuthPayload, User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            const payload = (await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })) as AuthPayload;

            const user = await this.userRepository.findOne({
                where: { id: payload.id },
            });

            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            request['user'] = {
                ...payload,
                role: user.role,
            };
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const str = request.headers['authorization'];
        if (!str) {
            throw new UnauthorizedException();
        }
        const [type, token] = str.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
