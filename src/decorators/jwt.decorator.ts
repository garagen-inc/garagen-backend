import { SetMetadata } from '@nestjs/common';

export const JWT = (checkJWT = true) => SetMetadata('jwt', checkJWT);
