import { IsString } from "class-validator";

export class FileNameDto {
  @IsString()
  fileName: string;

}