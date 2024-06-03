import { Global, Module } from '@nestjs/common'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { profileProvider } from './entities/providers/profile.provider'
import { userProvider } from '../users/entities/providers/user.provider'
import { IStorageProvider } from 'src/commons/providers/file-storage/interfaces/storage.interface'
import { S3StorageProvider } from 'src/commons/providers/file-storage/s3/s3-storage.provider'

@Global()
@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ...profileProvider,
    ...userProvider,
    {
      provide: 'IStorageProvider',
      useFactory: (): IStorageProvider => {
        const folderName = 'profiles'
        return new S3StorageProvider(folderName)
      },
    },
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
