import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

export function CommonErrorResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request: The request could not be understood or was missing required parameters.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized: Authentication is required and has failed or has not yet been provided.',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden: The request was legal, but the server is refusing to respond to it.',
    }),
    ApiResponse({ status: 404, description: 'Not Found: The requested resource was not found.' }),
    ApiResponse({
      status: 405,
      description: 'Method Not Allowed: The method specified in the request is not allowed.',
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error: An internal server error occurred.' }),
    ApiResponse({
      status: 501,
      description:
        'Not Implemented: The server either does not recognize the request method, or it lacks the ability to fulfill the request.',
    }),
    ApiResponse({
      status: 502,
      description: 'Bad Gateway: The server received an invalid response from the upstream server.',
    }),
    ApiResponse({
      status: 503,
      description:
        'Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance.',
    }),
    ApiResponse({
      status: 504,
      description: 'Gateway Timeout: The server did not receive a timely response from the upstream server.',
    }),
  )
}
