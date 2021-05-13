import { Test, TestingModule } from '@nestjs/testing'
import { CustomerRepository } from './customer.repository'
import { createStubCustomer } from './test-helpers'
import { awsSdkPromiseResponse, DynamoDB } from '../__mocks__/aws-sdk'

const db = new DynamoDB.DocumentClient()
const stubCustomer = createStubCustomer()

describe('Customer Repository', () => {
  let customerRepository: CustomerRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerRepository],
    }).compile()

    customerRepository = module.get<CustomerRepository>(CustomerRepository)
  })

  describe('createCustomer', () => {
    it('should return the created customer', async () => {
      const result = await customerRepository.createCustomer(stubCustomer)

      expect(db.put).toHaveBeenCalledWith({ TableName: 'service-centre-customers-dev', Item: stubCustomer })
      expect(result).toEqual(stubCustomer)
    })

    it('should throw an internal server exception if adding to DB fails', async () => {
      awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject())

      await expect(customerRepository.createCustomer(stubCustomer)).rejects.toThrowError('Failed to insert into DB')
    })
  })
})
