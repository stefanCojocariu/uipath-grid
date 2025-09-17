import { ChessService } from '../chess.service';

export const chessServiceMock: () => jasmine.SpyObj<ChessService> = () =>
  jasmine.createSpyObj<ChessService>('ChessService', ['getMonthlyGames']);
