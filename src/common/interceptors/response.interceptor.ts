import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { ResponseMessageKey } from '../decorators/response.decorator';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    const responseMessage = this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ?? null;

    return next.handle().pipe(
      map(data => {
        return {
          success: response.statusCode === 201 || response.statusCode === 200,
          data: data,
          message: responseMessage || 'Request successful',
        };
      }),
    );
  }
}
