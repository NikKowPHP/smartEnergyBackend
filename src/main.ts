import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Smart Grid Energy API')
    .setDescription('The Smart Grid Energy API description')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.API_PORT || 3000);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

// Add this check to prevent multiple bootstrap calls
if (process.env.NODE_ENV === 'development') {
  let isBootstrapped = false;
  if (!isBootstrapped) {
    bootstrap();
    isBootstrapped = true;
  }
} else {
  bootstrap();
}