import { Module } from '@nestjs/common'
import { CustomersController } from './customers/customers.controller'
import { CustomersService } from './customers/customers.service'
import { CustomerRepository } from './customers/customer.repository'

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [CustomersService, CustomerRepository],
})
export class AppModule {}
