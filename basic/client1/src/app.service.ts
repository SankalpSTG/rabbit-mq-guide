import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQEvents, RMQServices } from './transports/rabbitmq/constants';
import { firstValueFrom } from 'rxjs';
import { RequestType } from './types';

@Injectable()
export class AppService {
  constructor(
    @Inject(RMQServices.RMQService1) private readonly rmqService1: ClientProxy,
  ){}
  async print(message: string){
    console.log(`Sending message to client 2`)
    this.rmqService1.emit(RMQEvents.Print, message)
  }
  printAndConfirm(message: string){
    console.log(`Sending message to client 2`)
    const obs = this.rmqService1.send(RMQEvents.PrintAndConfirm, message)
    obs.subscribe({
      next: (response) => {
        console.log(`Received from client 2: ${JSON.stringify(response)}`);
      },
      error: (err) => {
        console.error("Error receiving message:", err);
      }
    });
  }
  calculate(message: string){
    console.log(`Sending message to client 2`)
    const response = firstValueFrom(this.rmqService1.send(RMQEvents.Calculate, message))
    return response
  }
}
