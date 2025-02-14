export class Scores {
    scores: Record<string, number>
    constructor(player: string, bot: string){
        this.scores = { [player]: -1, [bot]: 1, tie: 0 }
    }
    getValue(){
        return this.scores
    }
}