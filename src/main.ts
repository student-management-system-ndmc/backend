import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Student Management API')
    .setDescription('API for managing students, parents, classes and subscriptions')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT')

  await app.listen(port)
  console.log(`Backend running on http://localhost:${port}`)
  console.log(`API Documentation available at http://localhost:${port}/api/docs`)
}
bootstrap()
