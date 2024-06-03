import { USER_REPOSITORY } from 'src/commons/constants/entities.constants'
import { User } from '../users.entity'

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
]
