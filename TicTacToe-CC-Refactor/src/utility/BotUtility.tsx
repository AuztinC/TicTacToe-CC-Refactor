import { Minimax } from "./Minimax";

export class BotUtility extends Minimax{
    constructor(player: string, bot: string){
        super(player, bot)
    }

    static easyMove(board: string[][]): { row: number, col: number}{
        const emptySpaces = []
        for(let i =0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(!board[i][j]){
                emptySpaces.push({row: i, col: j})
                }
            }
        }
        const ranIdx = Math.floor(Math.random() * emptySpaces.length)
        return {row: emptySpaces[ranIdx].row, col: emptySpaces[ranIdx].col}
    }

    hardMove(board: string[][]): { row: number, col: number} {
        let bestScore = -Infinity;
        let move = {row: -1, col: -1}
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    const tempBoard = board.map((row) => [...row]);
                    tempBoard[i][j] = this.bot
                    const score = this.minimax(tempBoard, 0, false);
                    if (score > bestScore) {
                    bestScore = score;
                    move = { row: i, col: j };
                    }
                }
            }
        }
        return move
    }
}