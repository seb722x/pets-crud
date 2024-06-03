export class UploadFileDto {
  readonly httpStatusCode?: number
  readonly requestId?: string
  readonly attempts?: number
  readonly totalRetryDelay?: number
  readonly ETag?: string
}
