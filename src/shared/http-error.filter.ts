import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){
       const ctx = host.switchToHttp();
       const response = ctx.getResponse();
       const request = ctx.getRequest();
       const status = exception.getStatus();
       const errResponse = {
          code: status,
          timestamp: new Date().toLocaleDateString(),
          url: request.url,
          method: request.method,
          message: exception.message.error || exception.message || null
       }
       Logger.error(`${request.method} ${request.url}`,JSON.stringify(errResponse),'ExceptionFilter')
       response.status(status).json(errResponse);
    }
}