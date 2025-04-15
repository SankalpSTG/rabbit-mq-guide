import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RequestType } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Post("print")
  print(@Body() body: RequestType) {
    this.appService.print(body.message);
  }

  @Post("print-and-confirm")
  printAndConfirm(@Body() body: RequestType) {
    this.appService.printAndConfirm(body.message);
  }

  @Post("calculate")
  calculate(@Body() body: RequestType) {
    return this.appService.calculate(body.message);
  }
}
