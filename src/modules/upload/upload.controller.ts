import {
  Body,
  Controller,
  Delete,
  Headers,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { request } from 'http';
import { FileNameDto } from './dto/fileName.dto';
import { FolderDataDto } from './dto/folderData.dto';
import { Prisma } from '@prisma/client';

@Controller('file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload/:warrantyId')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('warrantyId') warrantyId: number,
  ) {
    // console.log(files)
    try {

      const testList = await this.uploadService.createTestList(+warrantyId,)
      return await Promise.all(
        files.map((file) =>
          this.uploadService.uploadFile(file.buffer, file.originalname, +warrantyId, testList.id),
        ),
      );
    } catch (error) {
      return `Failed to upload image file: ${error.message}`;
    }
  }

  @Delete('delete')
  async delete(@Body() fileInfo: FileNameDto) {
    try {
      return await this.uploadService.deleteFile(fileInfo.fileName);
    } catch (error) {
      return `Failed to upload image file: ${error.message}`;
    }
  }
}
