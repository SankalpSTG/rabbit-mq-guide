import { ClientProvider, ClientsModuleAsyncOptions, ClientsProviderAsyncOptions, RmqOptions, Transport } from "@nestjs/microservices";
import {ConfigModule, ConfigService} from "@nestjs/config"
import { RMQServices, RMQueues } from "./constants";
export const RABBITMQ1_SERVICE = 'RABBITMQ1_SERVICE';

export const RabbitMQConfig= (configService: ConfigService, queue: string):RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.get<string>("RABBITMQ_URL")!!],
    queue: queue,
    queueOptions: {
      durable: true
    },
  },
})

export const RabbitMQ1Factory: ClientsProviderAsyncOptions = {
  name: RMQServices.RMQService1,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<ClientProvider> => RabbitMQConfig(configService, RMQueues.Queue1)
}