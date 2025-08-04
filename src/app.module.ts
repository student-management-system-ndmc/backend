import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParentsModule } from './modules/parents/parents.module'
import { StudentsModule } from './modules/students/students.module'
import { ClassesModule } from './modules/classes/classes.module'
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module'

import { ConfigModule, ConfigService } from '@nestjs/config'
import * as entities from './entities'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: Object.values(entities),
        synchronize: false,
        logging: false,
        maxQueryExecutionTime: 1000,
      }),
    }),
    ParentsModule,
    StudentsModule,
    ClassesModule,
    SubscriptionsModule,
  ],
})
export class AppModule {}
