import { IsNotEmpty, IsEmail, IsString, IsObject } from 'class-validator'
import { PhoneContact } from '../customer.entity'

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  phone1: PhoneContact

  @IsNotEmpty()
  phone2: PhoneContact

  @IsNotEmpty()
  phone3: PhoneContact

  @IsNotEmpty()
  @IsString()
  address: string
}
