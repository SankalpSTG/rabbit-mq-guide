import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQConfig } from './transports/rabbitmq.transport';
import { ConfigService } from '@nestjs/config';
import { RMQueues } from './transports/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ["error", "warn", "debug"]});
  app.connectMicroservice(RabbitMQConfig(app.get(ConfigService), RMQueues.Queue1))
  app.startAllMicroservices()
}
bootstrap();
