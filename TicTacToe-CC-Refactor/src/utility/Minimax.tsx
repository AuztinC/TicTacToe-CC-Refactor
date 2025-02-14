import { CheckWinner } from "./CheckWinner";
import { Scores } from "./Scores";

export class Minimax {
    // scores based on the outcome of checkWinner. "X", "O", "tie"
    // using Record to extend string types as keys from [player], [bot], "tie" assigning their value as numbers
    scores: Record<string, number>
    player: string;
    bot: string;

    constructor(player: string, bot: string) {
        this.scores = new Scores(player, bot).getValue()
        this.player = player
        this.bot = bot
    }
    minimax(board: string[][], depth: number, isMax: boolean): number {
        // const scores: Record<string, number> = { [player]: -1, [bot]: 1, tie: 0 };
      // if checkWinner returns "X", "O", or "tie" return that result.
      // else if result === null, continue minimax
      const result = CheckWinner.run(board);
      if (result) return this.scores[result];
    
      // using our maximizing player(isMax) variable properly 
      // reduced redundent code by checking its state and flipping it accordingly
      let bestScore = isMax ? -Infinity : Infinity;
    
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            board[i][j] = isMax ? this.bot : this.player;
            const score = this.minimax(board, depth + 1, !isMax);
            board[i][j] = "";
            bestScore = isMax ? Math.max(score, bestScore) : Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    };
}