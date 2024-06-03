import { IsEnum, IsNotEmpty, isNotEmpty } from 'class-validator'
import { eProviders } from 'src/commons/interfaces/provider.interface'
import { userRoles } from 'src/commons/interfaces/userRoles.interface'

export class LoginDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}

export class RegisterDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}

export class AdminRegisterDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsEnum(userRoles, { each: true })
  roles: number[]

  given_name: string

  family_name: string
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  username: string
}

export class ForgotPasswordUpdateDto {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  code: string
}

export class ValidateForgotPasswordDto {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  reset_code: number
}

export class ValidateAccountDto {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  code: number
}

export class EmailDto {
  @IsNotEmpty()
  email: string
}
