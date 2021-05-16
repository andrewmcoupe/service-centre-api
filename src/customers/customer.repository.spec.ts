import { Test, TestingModule } from '@nestjs/testing'
import { CustomerRepository } from './customer.repository'
import { createStubCustomer } from '../helpers/test-helpers'
import { awsSdkPromiseResponse, DynamoDB } from '../__mocks__/aws-sdk'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

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

      expect(db.put).toHaveBeenCalledWith({ TableName: process.env.DYNAMO_TABLE_NAME, Item: stubCustomer })
      expect(result).toEqual(stubCustomer)
    })

    it('should throw an internal server exception if adding to DB fails', async () => {
      awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject())

      await expect(customerRepository.createCustomer(stubCustomer)).rejects.toThrowError('Failed to insert into DB')
    })
  })

  describe('getCustomerById', () => {
    it('should return the created customer', async () => {
      const stubId = '1'
      awsSdkPromiseResponse.mockReturnValueOnce({ Item: stubCustomer })
      const result = await customerRepository.getCustomerById(stubId)

      expect(db.get).toHaveBeenCalledWith({
        TableName: process.env.DYNAMO_TABLE_NAME,
        Key: {
          _id: stubId,
        },
      })
      expect(result).toEqual(stubCustomer)
    })

    it('should throw a not found exception if the customer cant be found', async () => {
      awsSdkPromiseResponse.mockReturnValueOnce({ Item: undefined })

      await expect(customerRepository.getCustomerById('1')).rejects.toThrowError(NotFoundException)
    })
  })
})
