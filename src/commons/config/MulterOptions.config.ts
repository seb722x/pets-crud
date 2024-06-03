import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { extname } from 'path'
import { memoryStorage } from 'multer'

export const multerOptions: MulterOptions = {
  fileFilter(req, file, cb) {
    console.log('Checking Image!', file)
    const suffix = file.originalname.slice(file.originalname.lastIndexOf('.') + 1)
    console.log('SFX: ', suffix)
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp|heic)$/)) {
      console.log('Image approved! Multer')
      cb(null, true)
    } else {
      console.warn(`Unsupported file: ${extname(file.originalname)}`)
      cb(new Error('Unsupported file'), false)
    }
    return true
  },
  storage: memoryStorage(),
  limits: {
    fileSize: 10485760 * 2,
  },
}
