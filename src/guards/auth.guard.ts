import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDTO } from 'src/auth/dto/token-payload.dto';
import { UserService } from 'src/user/user.service';
import { ExceptionReasonDTO } from 'src/utils/dtos/exception-reason.dto';
import { ExceptionDTO } from 'src/utils/dtos/exception.dto';
import { UnauthorizedException } from 'src/utils/exceptions/common.exception';
import { BearerTokenProcessor } from 'src/utils/functions/bearer-token-processor.function';

@Injectable()
export class AuthGuard {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkJWT = this.reflector.get<boolean>('jwt', context.getHandler()) ?? true;
    const request = context.switchToHttp().getRequest();

    if (checkJWT === false) return true;

    const authorization = request.headers['authorization'];

    const payload = await this.verifyAuthorization(authorization);

    request.payloadDTO = payload;

    return true;
  }

  async verifyAuthorization(authorization: string | undefined): Promise<TokenPayloadDTO> {
    if (!authorization)
      throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('Authorization header', 'Authorization header is required', 'Necessário um cabeçalho de autenticação'), HttpStatus.UNAUTHORIZED);
    if (!authorization.includes(' '))
      throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('Token malformed', 'Invalid authorization format', 'Formato da autorização inválido'), HttpStatus.UNAUTHORIZED);
    const [type, token] = authorization.split(' ');

    const allowedAuthorizationTypes = ['Bearer'];
    if (!allowedAuthorizationTypes.includes(type))
      throw ExceptionDTO.withError(
        'Guard',
        new ExceptionReasonDTO(
          'Invalid Token type',
          `Invalid type for authorization, allowed types are ${allowedAuthorizationTypes}`,
          `Tipo de autorização é inválido, os tipos validos são: ${allowedAuthorizationTypes}`,
        ),
        HttpStatus.UNAUTHORIZED,
      );

    switch (type) {
      case 'Bearer': {
        const bearerTokenProcessor = new BearerTokenProcessor(this.jwtService, token);
        if (!bearerTokenProcessor.isBearerToken()) throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('JWT', 'JWT decode error', 'Formato do JWT é inválido'), HttpStatus.UNAUTHORIZED);
        if (!bearerTokenProcessor.isSignatureValid())
          throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('JWT', 'Signature is invalid or token already expired', 'Assinatura inválida ou token já expirado'), HttpStatus.UNAUTHORIZED);
        const userEntity = await this.userService.find({
          relations: ['workshop', 'workshop.address'],
          where: { id: bearerTokenProcessor?.payload?.id, cpf: bearerTokenProcessor?.payload?.cpf, email: bearerTokenProcessor?.payload?.email },
        });
        if (!userEntity) throw UnauthorizedException;
        console.log(userEntity);
        return new TokenPayloadDTO(userEntity.id, userEntity.email, userEntity.cpf);
      }
      default:
        throw ExceptionDTO.withError(
          'Guard',
          new ExceptionReasonDTO(
            'Invalid Token type',
            `Invalid type for authorization, allowed types are ${allowedAuthorizationTypes}`,
            `Tipo de autorização é inválido, os tipos validos são: ${allowedAuthorizationTypes}`,
          ),
          HttpStatus.UNAUTHORIZED,
        );
    }
  }
}
