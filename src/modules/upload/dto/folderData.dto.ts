import { IsString } from "class-validator";

export class FolderDataDto {
  @IsString()
  warrantyId: string;

  @IsString()
  authorName: string;

}