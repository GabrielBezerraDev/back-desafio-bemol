import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, Accept',
    credentials: true
  });

  app.use(
    session({
      secret: 'bemolDigital',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
