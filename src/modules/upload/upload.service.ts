import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileDto } from './dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createClient } from '@supabase/supabase-js';
import { FileEntity, Prisma } from '@prisma/client';
import {
  PutObjectCommand,
  S3Client,
  S3,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import { default as multerHandler } from './multer-config';
import { Upload } from '@aws-sdk/lib-storage';
import { Action } from '../auth/guards/enum/actions.enum';
import { v4 as uuidv4 } from 'uuid';
import { FolderDataDto } from './dto/folderData.dto';

type FileStored = {
  id: number;
  testId: number;
  fileName: string;
  fileUrl: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UploadService {
  constructor(
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  bucketName = this.configService.get('AWS_BUCKET_NAME');

  s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
    forcePathStyle: true,
  });
  async uploadFile(
    dataBuffer: Buffer,
    fileName: string,
    warrantyId: number,
    testListId: number,
  ) {
    try {
      const warrantyData = await this.prismaService.warranty.findUnique({
        where: {
          id: warrantyId,
        },
        include: {
          author: {
            select: {
              name: true,
              lastName: true,
            },
          },
        },
      });
      const authorName = `${warrantyData.author.name}${warrantyData.author.lastName}`;
      const parallelUploads3 = new Upload({
        client: this.s3,

        leavePartsOnError: false,
        params: {
          Bucket: this.bucketName,
          Key: `${warrantyId}_${authorName}/${fileName}`,

          Body: dataBuffer,
        },
      });

      const uploadResult = await parallelUploads3
        .done()
        .then(function (data) {
          // console.log(data);
          return data;
        })
        .catch(function (err) {
          throw new UnauthorizedException(err);
        });

      const extractCodeFromFileName = (fileName: string) => {
        const match = fileName.match(/_(\d+)_/);

        if (match && match[1]) {
          return +match[1];
        } else {
          return null; // Return null or handle the case where the code is not found
        }
      };

      const testType = await this.prismaService.testType.findUnique({
        where: { code: extractCodeFromFileName(fileName) },
      });
      await this.prismaService.test.upsert({
        create: {
          testListId: testListId,
          testTypeId: testType.id,
          assets: {
            create: {
              fileName,
              fileUrl: uploadResult.Location,
              key: uploadResult.Key,
            },
          },
        },
        where: {
          testListId_testTypeId: {
            testListId: testListId,
            testTypeId: testType.id,
          },
        },
        update: {
          assets: {
            create: {
              fileName,
              fileUrl: uploadResult.Location,
              key: uploadResult.Key,
            },
          },
        },
      });

      return uploadResult;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Usuário não encontrado!');
    }
  }

  async createTestList(warrantyId: number) {
    const result = await this.prismaService.testList.create({
      data: {
        warrantyId: warrantyId,
      },
    });

    return result;
  }

  async getFilesFromWarranty(warrantyId: number) {
    const result = await this.prismaService.fileEntity.findMany({
      where: {
        testId: (
          await this.prismaService.testList.findUnique({
            where: { warrantyId },
            select: { id: true },
          })
        ).id,
      },
      include: {
        test: {
          select: {
            testType: {
              select: {
                description: true,
                name: true,
                code: true,
                productType: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return result;
  }

  async deleteFile(fileName: string) {
    console.log(fileName);
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,

      Key: fileName,
    });
    const result = await this.s3.send(command);

    return result;
  }
}
