import { FileResponseDto } from '../dtos/file-response.dto'
import { UploadFileDto } from '../dtos/upload-file.dto'

export interface IStorageProvider {
  uploadMultipleFiles(folderName: string, files: Express.Multer.File[]): Promise<UploadFileDto[]>
  getFile(filePath: string): Promise<string>
  getAllFilesDirectory(directoryPath: string): Promise<FileResponseDto[]>
  deleteFile(filePath: string)
}
