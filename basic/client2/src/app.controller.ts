import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RMQEvents } from './transports/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern(RMQEvents.Print)
  handlePrintEvent(@Payload() data: string){
    console.log("Received Print Event")
    this.appService.print(data)
  }
  @MessagePattern(RMQEvents.PrintAndConfirm)
  handlePrintAndConfirmEvent(@Payload() data: string){
    console.log("Received Print And Confirm Event")
    return this.appService.printAndConfirm(data)
  }
  @MessagePattern(RMQEvents.Calculate)
  handleCalculateEvent(@Payload() data: string){
    console.log("Received Calculate Event")
    return this.appService.calculate(data)
  }
}
