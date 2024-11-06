import { AppService } from './app.service';
import 'dotenv/config';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
