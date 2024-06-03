import { Injectable, Logger } from '@nestjs/common'
import S3Client, {
  s3Config,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  getSignedUrl,
  HeadObjectCommand,
} from './s3-config'
import slug from '../slug/slug'
import { plainToInstance } from 'class-transformer'
import { FileResponseDto } from '../dtos/file-response.dto'
import { UploadFileDto } from '../dtos/upload-file.dto'
import { IStorageProvider } from '../interfaces/storage.interface'

@Injectable()
export class S3StorageProvider implements IStorageProvider {
  private readonly s3Client: typeof S3Client = S3Client
  private readonly folderName: string
  private readonly logger: Logger
  private readonly bucketName: string

  constructor(folderName: string) {
    this.folderName = folderName
    this.logger = new Logger(S3StorageProvider.name)
    this.bucketName = s3Config.bucketName
  }

  async uploadMultipleFiles(folderName: string, files: Express.Multer.File[]): Promise<UploadFileDto[]> {
    return Promise.all(files.map((file) => this.uploadFile(folderName, file)))
  }

  async getFile(filePath: string): Promise<string | null> {
    try {
      const directoryPath = this.slugPath(filePath)

      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: directoryPath,
        }),
      )

      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: directoryPath,
      })

      return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 })
    } catch (error) {
      this.logger.error(error)
      throw new Error(`Error  getting file at ${filePath}`)
    }
  }

  async getAllFilesDirectory(filePath: string): Promise<FileResponseDto[]> {
    try {
      const directoryPath = this.slugPath(filePath)
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: directoryPath,
      })
      const response = await this.s3Client.send(command)

      if (!response.Contents) {
        return []
      }

      const result = await Promise.all(
        response.Contents.map(async (item) => {
          const fileName = item.Key.split('/').pop()
          const url = await this.getFile(item.Key)
          return {
            name: fileName,
            url,
          }
        }),
      )

      return plainToInstance(FileResponseDto, result)
    } catch (error) {
      this.logger.error(error)
      throw new Error(`Error getting files at ${filePath}`)
    }
  }

  async deleteFile(filePath: string) {
    try {
      const directoryPath = this.slugPath(filePath)

      const deletedfile = await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: directoryPath,
        }),
      )

      return deletedfile
    } catch (error) {
      this.logger.error(error)
      throw new Error(`Error deleting file at ${filePath}`)
    }
  }

  private async uploadFile(folderName: string, fileContent: Express.Multer.File): Promise<UploadFileDto> {
    try {
      const directoryName = this.slugPath(`${folderName}/${fileContent.originalname}`)

      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: directoryName,
          Body: fileContent.buffer,
        }),
      )

      const { $metadata } = response

      const result = plainToInstance(UploadFileDto, $metadata)

      return result
    } catch (error) {
      this.logger.error(error)
      throw new Error(`Error uploading file at ${folderName}`)
    }
  }

  private slugPath(filePath: string): string {
    const folderPrefix = `${this.folderName}/`
    if (filePath.startsWith(folderPrefix)) {
      filePath = filePath.substring(folderPrefix.length)
    }

    const segments = filePath.split('/')
    const subFolderName = segments[0]
    let slugFileName = ''

    if (segments.length > 1) {
      const pathWithoutFolder = segments.slice(1).join('/')
      const fileNameSegments = pathWithoutFolder.split('/')
      const fileName = fileNameSegments.pop()
      const restOfPath = fileNameSegments.join('/')
      const slugFileNameOnly = slug(fileName)

      slugFileName = restOfPath.length > 0 ? `${restOfPath}/${slugFileNameOnly}` : slugFileNameOnly
    }

    return `${this.folderName}/${subFolderName}${slugFileName ? '/' + slugFileName : ''}`
  }
}
