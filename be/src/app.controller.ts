import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { Data } from './data.db';

@Controller("data")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    // return 'Hello world!'
    return this.appService.getAll();
  }

  @Get(':id')
  getOne(@Param() params: any) {
    console.log(params.id)
    return this.appService.getData(params.id as string)
  }

  @Post()
  createOne(@Req() req: Request) {
    const data = req.body
    return this.appService.createData(data as Data)
  }

  @Put()
  updateOne(@Req() req: Request) {
    const data = req.body
    return this.appService.updateData(data as Data)
  }

  @Delete()
  deleteOne(@Req() req: Request) {
    const data_id = req.body
    return this.appService.deleteData(data_id as string)
  }
}
