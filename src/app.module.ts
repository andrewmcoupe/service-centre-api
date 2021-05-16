import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CustomersController } from './customers/customers.controller'
import { CustomersService } from './customers/customers.service'
import { CustomerRepository } from './customers/customer.repository'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, CustomerRepository],
})
export class AppModule {}
