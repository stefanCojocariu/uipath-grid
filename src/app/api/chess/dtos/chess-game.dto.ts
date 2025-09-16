import { AccuraciesDto } from './accuracies.dto';
import { PlayerDto } from './player.dto';

export interface ChessGameDto {
  uuid: string;
  accuracies: AccuraciesDto;
  black: PlayerDto;
  white: PlayerDto;
  time_class: string;
  end_time: number;
}
