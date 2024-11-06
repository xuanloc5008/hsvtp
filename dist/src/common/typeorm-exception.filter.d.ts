import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
export declare class TypeORMExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost): void;
}
