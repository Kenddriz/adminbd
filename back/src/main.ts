import { NestFactory } from '@nestjs/core';
import { loadEnvVariables } from './configuration/connexionLoader';
import { NestExpressApplication } from '@nestjs/platform-express';

loadEnvVariables().then(async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    require('./app.module').AppModule,
  );
  await app.listen(process.env.PORT, '0.0.0.0');
  console.log(
    'Connexion au serveur établie (http://localhost:' + process.env.PORT + ')',
  );
});
