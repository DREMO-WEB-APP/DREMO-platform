import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import {ApplicationError} from "../../../shared/application/errors/application.error";
import {Response} from "express";
import { AdminProfileNotFoundError } from "../../application/errors/admin-profile-not-found.error";
import { StudentProfileNotFoundError } from "../../application/errors/student-profile-not-found.error";
import { StudentAccountNotFoundError } from "../../application/errors/student-account-not-found.error";
import { DniProfileExistsError } from "../../application/errors/dni-profile.exists.error";
import { StudentAlreadyActivatedError } from "../../application/errors/student-already-activated.error";
import { StudentEmailAccountNotValidError } from "../../application/errors/student-email-account-not-valid.error";
import { NotMatchReniecError } from "../../application/errors/not-match-reniec.error";

@Catch(ApplicationError)
export class ProfileApplicationExceptionFilter implements ExceptionFilter {

    catch(exception: ApplicationError, host: ArgumentsHost){

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.error({
            code: exception.code,
            internalMessage: exception.internalMessage,
        });

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorName = 'Internal Server Error';

        if (exception instanceof AdminProfileNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = AdminProfileNotFoundError.name;
        }
        else if (exception instanceof StudentProfileNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = StudentProfileNotFoundError.name;
        }
        else if (exception instanceof StudentAccountNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = StudentAccountNotFoundError.name;
        }
        else if (exception instanceof DniProfileExistsError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = DniProfileExistsError.name;
        }
        else if (exception instanceof StudentAlreadyActivatedError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = StudentAlreadyActivatedError.name;
        }
        else if (exception instanceof StudentEmailAccountNotValidError) {
            statusCode = HttpStatus.BAD_REQUEST;
            errorName = StudentEmailAccountNotValidError.name;
        }
        else if (exception instanceof NotMatchReniecError) {
            statusCode = HttpStatus.BAD_REQUEST;
            errorName = NotMatchReniecError.name;
        }


        response
            .status(statusCode)
            .json({
                statusCode,
                error: exception.code || errorName,
                message: exception.publicMessage,
            });
    }
}