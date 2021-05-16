import { Test, TestingModule } from '@nestjs/testing'
import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'
import { Customer } from './customer.entity'
import { CreateCustomerDto } from './dto/create-customer.dto'

jest.mock('./customers.service')

const stubCustomer = new Customer()
stubCustomer._id = '1'
stubCustomer.name = 'Test company'
stubCustomer.address = '123 Smith Rd'
stubCustomer.email = 'abc@def.com'
stubCustomer.phone1 = { name: 'Andy', number: '07000000000' }
stubCustomer.phone2 = { name: 'Andy', number: '07000000000' }
stubCustomer.phone3 = { name: 'Andy', number: '07000000000' }

describe('CustomersController', () => {
  let customersController: CustomersController
  let customersService: CustomersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile()

    customersController = module.get<CustomersController>(CustomersController)
    customersService = module.get<CustomersService>(CustomersService)
  })

  describe('createCustomer', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'test customer',
      address: '123 Smith Rd',
      email: 'abc@def.com',
      phone1: { name: 'Andy', number: '07000000000' },
      phone2: { name: 'Andy', number: '07000000000' },
      phone3: { name: 'Andy', number: '07000000000' },
    }
    it('should return a customer successfully', async () => {
      const mockCreateCustomer = customersService.createCustomer as jest.Mock
      mockCreateCustomer.mockResolvedValue(stubCustomer)

      const result = await customersController.createCustomer(createCustomerDto)

      expect(customersService.createCustomer).toHaveBeenCalledWith(createCustomerDto)
      expect(result).toEqual(stubCustomer)
    })
  })

  describe('getCustomerById', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'test customer',
      address: '123 Smith Rd',
      email: 'abc@def.com',
      phone1: { name: 'Andy', number: '07000000000' },
      phone2: { name: 'Andy', number: '07000000000' },
      phone3: { name: 'Andy', number: '07000000000' },
    }
    it('should return a customer successfully', async () => {
      const mockGetCustomerById = customersService.getCustomerById as jest.Mock
      mockGetCustomerById.mockResolvedValue(stubCustomer)

      const result = await customersController.getCustomer('1')

      expect(customersService.getCustomerById).toHaveBeenCalledWith(stubCustomer._id)
      expect(result).toEqual(stubCustomer)
    })
  })
})
