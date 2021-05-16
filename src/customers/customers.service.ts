import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { Customer } from './customer.entity'
import { CustomerRepository } from './customer.repository'

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name, address, email, phone1, phone2, phone3 } = createCustomerDto
    const customer = new Customer()
    customer._id = uuid()
    customer.name = name
    customer.address = address
    customer.email = email
    customer.phone1 = phone1
    customer.phone2 = phone2
    customer.phone3 = phone3
    customer.history = []

    return await this.customerRepository.createCustomer(customer)
  }

  async getCustomerById(id: string): Promise<Customer> {
    return await this.customerRepository.getCustomerById(id)
  }
}
