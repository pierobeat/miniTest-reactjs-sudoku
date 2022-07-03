import React, { useState } from 'react'
import './App.css';

// const emptyPuzzle = [
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
// ]

function App() {
  const [sudokuArr, setSudokuArr] = useState([])
  const [puzzleUpload, setPuzzleUpload] = useState(null)
  const [myOwnBoard, setMyOwnBoard] = useState(null)
  const [buildOwnBoard, setBuildOwnBoard] = useState(true)
  
  const board = [0,1,2,3,4,5,6,7,8]
  
  // console.log("cek dataArr", sudokuArr);
  // console.log("cek tipe data dataArr",typeof sudokuArr);

  const customPuzzle = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ]

  const puzzle = [
    [1,0,0,3,0,0,0,0,0],
    [8,0,0,2,0,0,3,0,3],
    [0,0,0,2,8,0,0,9,0],
    [5,3,8,6,0,7,9,4,0],
    [0,2,0,3,0,1,0,0,0],
    [1,0,9,8,0,4,6,2,3],
    [9,0,7,4,0,0,0,0,0],
    [0,4,5,0,0,0,2,0,9],
    [0,0,0,0,3,0,0,7,0],
  ]

  function clearBoard() {
    setSudokuArr([])
  }

  function playGame() {
    if(puzzleUpload !== null) {
      setPuzzleUpload(null)
    }

    if(myOwnBoard !== null) {
      setMyOwnBoard(null)
    }

    setSudokuArr(puzzle)
  }

  function resetGame() {
    let sudoku

    if(puzzleUpload !== null) {
      sudoku = puzzleUpload
    } else if(myOwnBoard !== null) {
      sudoku = myOwnBoard
    } else {
      sudoku = puzzle
    }

    setSudokuArr(sudoku)
  }

  function ownBoard() {
    setSudokuArr(customPuzzle)
    setMyOwnBoard(customPuzzle)
    setBuildOwnBoard(false)
  }

  function playOwnBoard() {
    setMyOwnBoard(sudokuArr)
    setBuildOwnBoard(true)
  }

  function onInputChange(e, row, col) {
    let val   = parseInt(e.target.value) || 0
    let grid  = JSON.parse(JSON.stringify(sudokuArr))
    
    if(val === 0 || (val >=1 && val <= 9)) {
      grid[row][col] = val
    }

    setSudokuArr(grid)
  }

  function handleFileChange(e) {
    const file   = e.target.files[0]
    const reader = new FileReader()
    const result = []

    reader.readAsText(file)
    reader.onload = () => {
      const data  = reader.result.split(/[\r\n]+/)

      for(let v of data) {
        // console.log(JSON.parse(v));
        result.push(JSON.parse(v));
      }

      setPuzzleUpload(result)
      setSudokuArr(result)
    }
    reader.onerror = () =>{
      console.error("file error", reader.error);
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Sudoku Game</h1>
        <table>
          <tbody>
            {
              board.map((row, rowIndex) => {
                // if((row + 1) %3 === 0) {
                //   console.log("hitung baris", row);
                // }
                return(
                  <tr key={rowIndex} className={(row + 1) %3 === 0 ? "board-border-bottom" : ""}>
                    {
                      board.map((col, colIndex) => {
                        return(
                          <td key={rowIndex + colIndex} className={(col + 1) %3 === 0 ? "board-border-right" : ""}>
                            {sudokuArr.length !== 0 ? 
                              <input 
                              value={sudokuArr[row][col] === 0 ? "" : sudokuArr[row][col]} 
                              className="input-cell"
                              onChange={e => onInputChange(e, row, col)}
                              disabled={sudokuArr ? sudokuArr[row][col] !== 0 : setPuzzleUpload[row][col] !== 0}
                            />
                            : 
                              <input  
                                className="input-cell"
                                value={""}
                                onChange={e => onInputChange(e, row, col)}
                                disabled
                              />
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="button-container">
            <button className="game-button" onClick={clearBoard}>Clear</button>
            <button className="game-button" onClick={playGame}>Play</button>
            <button className="game-button" onClick={resetGame}>Reset</button>
            <input type="file" onChange={(e) => handleFileChange(e)} />
            {!buildOwnBoard ? 
              <button className="game-button" onClick={playOwnBoard}>Play Own Board</button>
              :
              <button className="game-button" onClick={ownBoard}>Make Own Board</button>
            }
        </div>
      </div>
    </div>
  );
}

export default App;
