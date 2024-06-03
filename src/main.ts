import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { apiKey } from './commons/middlewares/api-key/api-key.middleware'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { RolesGuard } from './modules/auth0/guards/role.guard'
import { RestJwtAuthGuard } from './modules/auth0/guards/rest-jwt-auth.guard'
import { ExtendedLogger } from './modules/log/providers/custom-logger.provider'

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '0.0.0.0'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ExtendedLogger(),
  })
  const reflector = app.get(Reflector)

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  //app.useGlobalGuards(app.get(RestJwtAuthGuard), new RolesGuard(reflector))
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Bloodknot API')
    .setDescription('API using RESTFUL and JWT Authentication')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  //app.use(apiKey)
  await app.listen(PORT, HOST)
}
bootstrap()
