import { Test, TestingModule } from '@nestjs/testing'
import { CustomersService } from './customers.service'
import { CustomerRepository } from './customer.repository'
import { Customer } from './customer.entity'

jest.mock('./customer.repository')

const stubCustomer = new Customer()
stubCustomer.name = 'Test company'
stubCustomer.address = '123 Smith Rd'
stubCustomer.email = 'abc@def.com'
stubCustomer.phone1 = { name: 'Andy', number: '07000000000' }
stubCustomer.phone2 = { name: 'Andy', number: '07000000000' }
stubCustomer.phone3 = { name: 'Andy', number: '07000000000' }
stubCustomer.history = []

describe('CustomersService', () => {
  let customersService: CustomersService
  let customersRepository: CustomerRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, CustomerRepository],
    }).compile()

    customersService = module.get<CustomersService>(CustomersService)
    customersRepository = module.get<CustomerRepository>(CustomerRepository)
  })

  describe('createCustomer', () => {
    it('should return the created customer', async () => {
      const mockCreateCustomer = customersRepository.createCustomer as jest.Mock
      mockCreateCustomer.mockResolvedValue(stubCustomer)

      const result = await customersService.createCustomer(stubCustomer)

      expect(customersRepository.createCustomer).toHaveBeenCalledWith(expect.objectContaining(stubCustomer))
      expect(result).toEqual(stubCustomer)
    })
  })
})
