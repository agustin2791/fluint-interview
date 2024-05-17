import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { DataDao } from './data.dao';
import { Data } from './data.db';

@Injectable()
export class AppService {

  constructor(
    private readonly dataDao: DataDao
  ){}


  async getAll() {
    return await this.dataDao.getAll()
  }

  async getData(id: string) {
    return await this.dataDao.get(id)
  }

  async createData(newData: Data) {
    return await this.dataDao.create(newData)
  }

  async updateData(data: Data) {
    return await this.dataDao.update(data)
  }

  async deleteData(id: string) {
    return await this.dataDao.delete(id)
  }
}
