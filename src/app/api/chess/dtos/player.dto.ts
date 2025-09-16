import { ResultDto } from './result.dto';

export interface PlayerDto {
  uuid: string;
  ['@id']: string;
  rating: number;
  result: ResultDto;
  username: string;
}
