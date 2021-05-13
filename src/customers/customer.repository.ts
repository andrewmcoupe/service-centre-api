import { DynamoDB } from 'aws-sdk'
import { Customer } from './customer.entity'
import { InternalServerErrorException } from '@nestjs/common'

const dynamoDb = new DynamoDB.DocumentClient()

export class CustomerRepository {
  async createCustomer(customer: Customer): Promise<Customer> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'service-centre-customers-dev',
      Item: customer,
    }

    try {
      await dynamoDb.put(params).promise()
      return customer
    } catch (error) {
      throw new InternalServerErrorException('Failed to insert into DB')
    }
  }
}
