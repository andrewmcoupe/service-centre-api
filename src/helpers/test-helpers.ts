import { Customer } from '../customers/customer.entity'

export const createStubCustomer = () => {
  const stubCustomer = new Customer()
  stubCustomer.name = 'Test company'
  stubCustomer.address = '123 Smith Rd'
  stubCustomer.email = 'abc@def.com'
  stubCustomer.phone1 = { name: 'Andy', number: '07000000000' }
  stubCustomer.phone2 = { name: 'Andy', number: '07000000000' }
  stubCustomer.phone3 = { name: 'Andy', number: '07000000000' }
  stubCustomer.history = []

  return stubCustomer
}
