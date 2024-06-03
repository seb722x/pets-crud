import { LOG_REPOSITORY } from 'src/commons/constants/entities.constants'
import { Log } from '../log.entity'

export const logProvider = [
  {
    provide: LOG_REPOSITORY,
    useValue: Log,
  },
]
