import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { RMQServices } from './transports/constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(RMQServices.RMQService1) private readonly client: ClientProxy
  ){}
  print(data: string){
    console.log(`Print: ${data}`)
  }
  printAndConfirm(data: string){
    console.log(`PrintAndConfirm: ${data}`)
    return "Printed"
  }
  calculate(data: string){
    console.log(`Calculate: ${data}`)
    let splits = data.split(" ")
    switch(splits[1]){
      case "+":
        return `${parseInt(splits[0]) + parseInt(splits[2])}`
      case "-":
        return `${parseInt(splits[0]) - parseInt(splits[2])}`
      case "*":
        return `${parseInt(splits[0]) * parseInt(splits[2])}`
      case "/":
        return `${parseInt(splits[0]) / parseInt(splits[2])}`
      default:
        return ""
    }
  }
}
