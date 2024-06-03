import { ROLE_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Role } from '../roles.entity'

export const roleProvider = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
]
