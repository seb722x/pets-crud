import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { AuthenticationClient, ManagementClient } from 'auth0'
import { PasswordGenerator } from 'src/commons/password/password.generator'

type UserInput = {
  uuid: string
  email: string
  password?: string
}

type EmailInput = {
  email: string
}

type Event<T = UserInput> = {
  event: unknown
  response: T
}

@Injectable()
export class Auth0Service {
  private readonly logger: Logger

  private readonly auth0AuthenticationClient: AuthenticationClient
  private readonly auth0ManagementClient: ManagementClient

  constructor() {
    const credentials = {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    }

    this.logger = new Logger(Auth0Service.name)

    this.auth0AuthenticationClient = new AuthenticationClient({ ...credentials })
    this.auth0ManagementClient = new ManagementClient({ ...credentials })
  }

  async createUser(data: UserInput) {
    try {
      return await this.auth0ManagementClient.users.create({
        email: data.email,
        //user_id: data.uuid,
        connection: 'Username-Password-Authentication',
        password: data.password || PasswordGenerator.generate(),
      })
    } catch (error) {
      this.logger.error(error)
      throw new Error(error)
    }
  }

  async assignRoleToUsers(data): Promise<boolean> {
    try {
      await this.auth0ManagementClient.users.assignRoles({ id: data.userId }, { roles: data.roles })

      return true
    } catch (error) {
      this.logger.error(error)
    }
  }

  async getUserToken(email: string, password: string) {
    try {
      const tokens = await this.auth0AuthenticationClient.oauth.passwordGrant({
        username: email,
        password,
        scope: 'openid offline_access email profile',
        audience: process.env.AUTH0_AUDIENCE,
      });

      if (tokens.status >= 400) throw new Error(tokens.statusText);

      return tokens;
    } catch (error) {
      console.error(error); // Utiliza la consola directamente para un mejor detalle del error
      throw new Error(error.message);
    }
  }

  async getUserByAuth(id: string) {
    try {
      const fields = 'email,email_verified,identities,last_login'
      const includeFields = true

      const authUser = await this.auth0ManagementClient.users.get({
        id,
        fields,
        include_fields: includeFields,
      })

      return authUser.data
    } catch (error) {
      this.logger.error('Error fetching user email from Auth0:', error)
      throw new Error('Failed to fetch user email')
    }
  }
  async refreshToken(refreshToken: string) {
    try {
      const tokens = await this.auth0AuthenticationClient.oauth.refreshTokenGrant({
        refresh_token: refreshToken,
      })

      if (tokens.status >= 400) throw new Error(tokens.statusText)

      return tokens
    } catch (error) {
      this.logger.error(error)
      throw new Error(error)
    }
  }

  async updateUser(data: UserInput) {
    try {
      const user_id = data.uuid

      const user = await this.auth0ManagementClient.users.update(
        { id: `auth0|${user_id}` },
        {
          email: data.email,
        },
      )
      return user
    } catch (error) {
      this.logger.error(error)
      throw new Error(error)
    }
  }

  async deleteUser(data: UserInput) {
    try {
      const user_id = data.uuid

      await this.auth0ManagementClient.users.delete({ id: `auth0|${user_id}` })
    } catch (error) {
      this.logger.error(error)
      throw new Error(error)
    }
  }

  async resetPasswordMail(email: string) {
    try {
      await this.auth0AuthenticationClient.database.changePassword({
        email,
        connection: 'Username-Password-Authentication',
      })
    } catch (error) {
      this.logger.error(error)
      throw new Error(error)
    }
  }

  async setUserPassword(uuid: string, password: string) {
    try {
      await this.auth0ManagementClient.users.update(
        { id: `auth0|${uuid}` },
        {
          password,
        },
      )
    } catch (error) {
      this.logger.error(error)
      throw new Error(error)
    }
  }

  async resendVerificationEmail(userId: string) {
    try {
      return await this.auth0ManagementClient.jobs.verifyEmail({ user_id: userId })
    } catch (error) {
      this.logger.error('Failed to resend verification email:', error)
      throw new Error('Failed to resend verification email')
    }
  }

  @OnEvent('User.Create')
  async handleUserCreateEvent(event: Event) {
    await this.createUser(event.response)
    await this.resetPasswordMail(event.response.email)
  }

  @OnEvent('User.Update')
  async handleUserAlterEvent(event: Event) {
    await this.updateUser(event.response)
  }

  @OnEvent('User.Delete')
  async handleUserDeleteEvent(event: Event) {
    await this.deleteUser(event.response)
  }

  @OnEvent('User.Signup')
  async handleUserSignupEvent(event: Event) {
    await this.createUser(event.response)
  }

  @OnEvent('User.PasswordReset')
  async handleUserPasswordResetEvent(event: Event<EmailInput>) {
    await this.resetPasswordMail(event.response.email)
  }
}
