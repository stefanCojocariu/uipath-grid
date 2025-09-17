import { ChessGridService } from '../chess-grid.service';

export const chessGridServiceMock: () => jasmine.SpyObj<ChessGridService> = () =>
  jasmine.createSpyObj<ChessGridService>('ChessGridService', ['getChessGridData']);
