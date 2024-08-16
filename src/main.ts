import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatusMiddleware } from './middlewares/http-status.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new HttpStatusMiddleware().use);

  await app.listen(3000);
}
bootstrap();
