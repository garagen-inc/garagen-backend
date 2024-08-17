import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDTO } from 'src/auth/dto/token-payload.dto';

export class BearerTokenProcessor {
  private jwtService: JwtService;
  token: string;
  payload: TokenPayloadDTO;
  expirationTime?: number;
  creationTime?: string;

  constructor(jwtService: JwtService, token?: string) {
    this.jwtService = jwtService;
    if (token) this.token = token;
  }

  isBearerToken(): boolean {
    return this.jwtService.decode(this.token) ? true : false;
  }

  isSignatureValid(): boolean {
    try {
      const bearerTokenProcessor = this.jwtService.verify(this.token, { secret: process.env.JWT_SECRET });
      this.payload = bearerTokenProcessor.payload as TokenPayloadDTO;
      return this.matchesPayload();
    } catch (error) {
      return false;
    }
  }

  matchesPayload(): boolean {
    return this.payload && TokenPayloadDTO.matchesObject(this.payload);
  }

  create(payload: TokenPayloadDTO, expirationTime = '1d'): string {
    const options = expirationTime ? { expiresIn: expirationTime } : undefined;
    return this.jwtService.sign({ payload }, options);
  }
}
