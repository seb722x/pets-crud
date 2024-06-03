import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
  BucketLocationConstraint,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Config = {
  bucketName: process.env.AWS_S3_BUCKET_NAME || 'bloodknot-storage-dev',
  region: (process.env.AWS_REGION || 'us-east-2') as BucketLocationConstraint,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
}

const s3Client = new S3Client(s3Config)

export {
  s3Config,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  S3Client,
  getSignedUrl,
  HeadObjectCommand,
}

export default s3Client
