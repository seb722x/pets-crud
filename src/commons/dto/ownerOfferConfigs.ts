import { IsArray, IsEnum, IsNotEmpty } from 'class-validator'
import { offerConfigTypes } from 'src/commons/interfaces/offerConfigTypes.interface'

export class OwnerOfferConfigDto {
  @IsNotEmpty()
  data: {
    clientsSelected: boolean
    clientItems: Array<string>
    servicesSelected: boolean
    availableServices: Array<any>
    policySelected: boolean
    cancellationPolicy: Array<any>
  }
}
