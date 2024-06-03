export interface QueryParams {
  page: number
  limit: number
  sort: string
  direction: 'ASC' | 'DESC'
  admin?: boolean
}
