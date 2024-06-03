import { Body, Controller, Post, Res, HttpStatus, SetMetadata, Param } from '@nestjs/common'
import { Auth0Service } from './auth.service'
import { DeprecatedEndpoint } from 'src/commons/decorators/deprecated.decorator'

type UserInput = {
  uuid: string
  email: string
  password?: string
}

@Controller('auth')
export class AuthController {
  constructor(private authService: Auth0Service) {}

  @SetMetadata('isPublic', true)
  @Post('register')
  @DeprecatedEndpoint('This endpoint will be removed at the end of development.')
  async register(@Body() userInput: UserInput, @Res() res) {
    try {
      const user = await this.authService.createUser(userInput)
      return res.status(HttpStatus.CREATED).json(user)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
    }
  }

  @SetMetadata('isPublic', true)
  @Post('login')
  @DeprecatedEndpoint('This endpoint will be removed at the end of development.')
  async login(@Body() body: { email: string; password: string }, @Res() res) {
    try {
      const token = await this.authService.getUserToken(body.email, body.password)
      return res.status(HttpStatus.OK).json({ accessToken: token })
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message })
    }
  }

  @Post('verify-email/:user_id')
  async resendVerificationEmail(@Param('user_id') userId: string) {
    return await this.authService.resendVerificationEmail(userId)
  }
}
