import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { Customer } from './customer.entity'

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto)
  }

  @Get('/:id')
  getCustomer(@Param('id') id: string): Promise<Customer> {
    return this.customersService.getCustomerById(id)
  }
}
