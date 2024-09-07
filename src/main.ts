import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatusMiddleware } from './middlewares/http-status.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new HttpStatusMiddleware().use);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
