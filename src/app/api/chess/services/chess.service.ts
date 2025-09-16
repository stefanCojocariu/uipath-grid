import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChessGameDto } from '../dtos/chess-game.dto';
import { MonthlyGamesDto } from '../dtos/monthly-games.dto';

@Injectable()
export class ChessService {
  readonly #httpClient = inject(HttpClient);

  public getMonthlyGames(
    username: string,
    year: string,
    month: string
  ): Observable<ChessGameDto[]> {
    return this.#httpClient
      .get<MonthlyGamesDto>(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`)
      .pipe(map((monthlyGames) => monthlyGames.games));
  }
}
