import { eProviders } from '../../../commons/interfaces/provider.interface'

export interface iUser extends iProviderUser {
  id: string
  password: string
  is_blocked?: boolean
}

export interface iProviderUser {
  email: string
  provider: eProviders
  provider_uid?: string
  email_verified?: boolean
  name?: string
  given_name?: string
  family_name?: string
  picture?: string
}
