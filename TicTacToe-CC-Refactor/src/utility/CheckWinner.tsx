export class CheckWinner {
    
    static run(board: string[][]): string | null {
        const WINNING_PATTERNS = [
            [[0, 0], [0, 1], [0, 2]], //->
            [[1, 0], [1, 1], [1, 2]], //->
            [[2, 0], [2, 1], [2, 2]], //->
            [[0, 0], [1, 0], [2, 0]], //v
            [[0, 1], [1, 1], [2, 1]], // v
            [[0, 2], [1, 2], [2, 2]], //  v
            [[0, 0], [1, 1], [2, 2]], // \
            [[0, 2], [1, 1], [2, 0]], // /
          ];
      // loop through each WINNING_PATTERN
      for (const pattern of WINNING_PATTERNS) {
        // parse line of pattern to compare if both B & C are equal to A, from the board we sent in.
        const [a, b, c] = pattern;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
          return board[a[0]][a[1]];
        }
      }
      // check for empty spaces, if we find any return null(continue game)
      // if all spaces are occupied return tie
      for (const row of board) {
        for (const cell of row) {
          if (cell === "") return null;
        }
      }
      return "tie";
      // return board.flat().includes("") ? null : "tie"; 
    };
}