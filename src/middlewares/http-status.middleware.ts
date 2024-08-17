import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { ResponseDTO } from 'src/utils/api-response.util';

@Injectable()
export class HttpStatusMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;

    res.json = (body: any) => {
      if (body instanceof ResponseDTO && body.status) {
        res.status(body.status);
      }
      return originalJson.call(res, body);
    };

    next();
  }
}
