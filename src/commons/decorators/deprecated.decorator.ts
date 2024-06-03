import { Logger } from '@nestjs/common'

export function DeprecatedEndpoint(reason: string = ''): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      console.warn(`Warning: ${String(propertyKey)} is deprecated${reason ? ': ' + reason : ''}.`)
      Logger.warn(`Warning: ${String(propertyKey)} is deprecated${reason ? ': ' + reason : ''}.`)
      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
