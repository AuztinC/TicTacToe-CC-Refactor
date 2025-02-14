// DEPLOYED SITE : https://austincripe-cleancoders.netlify.app/

import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import { Player } from './utility/Player';
import { BotUtility } from './utility/BotUtility';
import { CheckWinner } from './utility/CheckWinner';

function App() {
  const displayWinner = useRef<HTMLDivElement>(null);
  const cellDivRef = useRef<HTMLDivElement[]>([]);
  const difficultyRef = useRef<HTMLSelectElement | null>(null)
  // decide whos turn it is currently in the game.
  const [playerTurn, setPlayerTurn] = useState(1);
  // create a 2d array to map through and create our divs.
  const [board, setBoard] = useState(Array(3).fill("").map(() => Array(3).fill("")));
  // set default difficulty to hard
  const [difficulty, setDifficulty] = useState(window.location.hash.slice(1,window.location.hash.length) || "hard")
  const [inGame, setInGame] = useState(false)

  // set our players markers.
  const bot = new Player("O")
  const player = new Player("X")

  // pass in rowIndex and colIndex of event space clicked.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClick(e:  React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) {
    // check if current space is occupied or if the game has been won or tied.
    if(playerTurn === 1) {
      if (board[row][col] || CheckWinner.run(board)) return;
      
      // create a copy of board for immutablilty; set player icon in space
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((r) => [...r]);
        newBoard[row][col] = player.getMarker();
        return newBoard;
      });
      // set className for text color
      if(e.target instanceof HTMLDivElement){
        e.target.className = `${e.target.className} ${player}`
      }
      // console.log("click")
      setPlayerTurn(2)

    }
}  

const botTurn = useCallback(() => {
  let bestMove = { row: -1, col: -1 };

  if(difficulty === "easy") {
    bestMove = BotUtility.easyMove(board)
  } else if (difficulty === "medium") {
    if(Math.random() < 0.5){
      bestMove = BotUtility.easyMove(board)
    } else {
      bestMove = new BotUtility(player.getMarker(), bot.getMarker()).hardMove(board)
    }
  } else {
    // "Hard" difficulty, always choose best move.
    bestMove = new BotUtility(player.getMarker(), bot.getMarker()).hardMove(board)
  }
  // Once we find the best possible position for both Row & Col
  // set our Board state with an immutible copy of previous state.
  if (bestMove.row !== -1 && bestMove.col !== -1) {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((r) => [...r]);
      newBoard[bestMove.row][bestMove.col] = bot.getMarker();
      console.log(newBoard)
      return newBoard;
    });
    
  }
  setPlayerTurn(1);
  setInGame(true);
  
}, [board, difficulty]);

// ever turn, check for winner or tie to display
// if no winner is found check if it is Bot's turn
// give the bot a 500ms "think" time before acting
useEffect(() => {
  const result = CheckWinner.run(board);
  if (result && displayWinner.current) {
    displayWinner.current.innerHTML = result === "tie" ? "It's a Tie!" : `${result} Wins!`;
    setInGame(false);
  } else if (playerTurn === 2) {
    setTimeout(() => botTurn(), 500);
  }
}, [board, playerTurn, inGame]);

useEffect(()=>{
  window.location.hash = difficulty
}, [difficulty])

// recreate board array
// create array from HTMLNodeList and reset classes for colors
// set player turn and reset inGame + winner Div Content to empty string
function resetGame() {
  setBoard(Array(3).fill("").map(()=>Array(3).fill("")))
  const cellArr = Array.from(cellDivRef.current)
  cellArr.forEach((div:HTMLDivElement)=>{
    div.classList.remove("X")
  })
  setPlayerTurn(1)
  setInGame(false)
  if (displayWinner.current) displayWinner.current.innerHTML = "";
}

// index used to add all 9 cells to cellDivRef
let idx = 0
  return (
    <>
      <div id="displayWinner" ref={displayWinner}></div>
      <select name="difficulty" ref={difficultyRef} value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} ref={(el) => { if (el) cellDivRef.current[idx] = el; idx++; }} className="cell" onClick={(e) => handleClick(e, rowIndex, colIndex)}>
              {cell}
            </div>
          ))
        )}
      </div>
      {inGame && <button onClick={resetGame}>Reset</button>}
    </>
  )
}

export default App