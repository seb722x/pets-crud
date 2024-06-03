import { Request, Response, NextFunction } from 'express'

export function apiKey(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers
  const query = req.query
  const routeInPieces = req.originalUrl.split('/')

  if (!(routeInPieces[1] === 'api') || routeInPieces[2] === 'forget_password') {
    next()
    return
  }

  const apiKEY = headers['api_key'] || headers['API_KEY'] || query['API_KEY']

  if (!apiKEY) {
    res.status(403).json({ message: 'API KEY not provided' })
    return
  } else if (process.env.API_KEY !== apiKEY) {
    res.status(405).json({ message: 'Bad API KEY provided' })
    return
  } else {
    next()
  }
}
