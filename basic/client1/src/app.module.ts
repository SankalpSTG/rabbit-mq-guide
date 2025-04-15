import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQ1Factory } from './transports/rabbitmq/rabbitmq.transport';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ClientsModule.registerAsync([RabbitMQ1Factory])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
