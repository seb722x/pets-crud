import { PROFILE_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Profile } from '../profile.entity'

export const profileProvider = [
  {
    provide: PROFILE_REPOSITORY,
    useValue: Profile,
  },
]
