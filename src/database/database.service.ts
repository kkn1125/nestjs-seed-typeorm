import { CommonService } from '@common/common.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly commonService: CommonService) {}

  createTypeOrmOptions() {
    const databaseConfig = this.commonService.getConf('database');
    return databaseConfig;
  }
}
