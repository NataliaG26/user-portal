import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './shared/exceptions/http-exception.filter';

/**
 * Application bootstrap function.
 * Initializes the NestJS application with global configurations:
 * - API prefix
 * - Cookie parser
 * - CORS
 * - Global exception filter
 * - Validation pipe
 * - Swagger documentation
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  
  // Set global API prefix for all routes
  app.setGlobalPrefix('api');
  
  // Enable cookie parsing for JWT authentication
  app.use(cookieParser());
  
  // Configure CORS for frontend communication
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // Apply global exception filter for consistent error handling
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  // Apply global validation pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configure Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('User Portal API')
    .setDescription('REST API for User & Posts Management Portal')
    .setVersion('1.0')
    .addCookieAuth('token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Start the server
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
