import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ async: true })
export class IsValidSortConstraint implements ValidatorConstraintInterface {
  validate(sort: string, args: ValidationArguments) {
    const validOrders = ['asc', 'desc']
    const parts = sort.split('_')
    if (parts.length !== 2) return false
    const [field, order] = parts
    return validOrders.includes(order.toLowerCase())
  }
  defaultMessage(args: ValidationArguments) {
    return 'Sort parameter is invalid. Valid format: field_order (e.g., field_asc).'
  }
}
