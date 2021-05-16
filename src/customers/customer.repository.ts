import { DynamoDB } from 'aws-sdk'
import { Customer } from './customer.entity'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

const dynamoDb = new DynamoDB.DocumentClient()

const buildBaseParams = () => ({
  TableName: process.env.DYNAMO_TABLE_NAME,
})

export class CustomerRepository {
  async createCustomer(customer: Customer): Promise<Customer> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      ...buildBaseParams(),
      Item: customer,
    }

    try {
      await dynamoDb.put(params).promise()
      return customer
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Failed to insert into DB',
        error: error,
      })
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      ...buildBaseParams(),
      Key: {
        _id: id,
      },
    }

    const result = await dynamoDb.get(params).promise()

    if (!result.Item) {
      throw new NotFoundException()
    }

    return result.Item as Customer
  }
}
