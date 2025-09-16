import { inject, Injectable } from '@angular/core';
import { ChessGameDto } from '../../api/chess/dtos/chess-game.dto';
import { ResultDto } from '../../api/chess/dtos/result.dto';
import { ChessGridData } from '../models/chess-grid-data.model';
import { ChessService } from '../../api/chess/services/chess.service';
import { map, Observable } from 'rxjs';
import { ChessGridConfig } from '../models/chess-grid-config.model';

@Injectable()
export class ChessGridService {
  readonly #chessService = inject(ChessService);

  private readonly CHESS_GRID_CONFIG: ChessGridConfig = {
    username: 'cojocariustefan',
    year: '2024',
    month: '11',
  };
  private readonly RESULT_ICONS = new Map<ResultDto, string>([
    [ResultDto.WIN, '🏆'],
    [ResultDto.ABANDONED, '🚪'],
    [ResultDto.CHECKMATED, '♟️💀'],
    [ResultDto.TIMEOUT, '⏰'],
    [ResultDto.RESIGNED, '🏳️'],
    [ResultDto.REPETITION, '🔄'],
    [ResultDto.INSUFFICIENT, '⚖️'],
  ]);

  public getChessGridData(
    username?: string,
    year?: string,
    month?: string
  ): Observable<ChessGridData[]> {
    return this.#chessService
      .getMonthlyGames(
        username || this.CHESS_GRID_CONFIG.username,
        year || this.CHESS_GRID_CONFIG.year,
        month || this.CHESS_GRID_CONFIG.month
      )
      .pipe(map((g) => this.mapChessGamesToGridData(g, this.CHESS_GRID_CONFIG.username)));
  }

  private formatResult(result: ResultDto): string {
    const icon = this.RESULT_ICONS.get(result) ?? '❓';

    return `${result.toUpperCase()}${icon}`;
  }

  private mapChessGamesToGridData(games: ChessGameDto[], username: string): ChessGridData[] {
    return games.map((game) => {
      const playedAsWhite = game.white.username === username;
      const rating = playedAsWhite ? game.white.rating : game.black.rating;
      const opponent = playedAsWhite ? game.black.username : game.white.username;
      const result = playedAsWhite ? game.white.result : game.black.result;

      return {
        id: game.uuid,
        date: game.end_time ? new Date(game.end_time * 1000).toLocaleDateString('en-GB') : '',
        type: game.time_class,
        opponent,
        rating: rating,
        result: this.formatResult(result),
        playedAsWhite: playedAsWhite ? 'YES ⚪' : 'NO ⚫',
      };
    });
  }
}
