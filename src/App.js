import React, {useEffect, useState} from 'react'
import './App.css';

const initialPuzzle = [
  [0,5,0,9,0,0,0,0,0],
  [8,5,0,9,4,0,3,0,7],
  [0,0,0,2,8,0,0,9,0],
  [5,3,8,6,0,7,9,4,0],
  [0,2,0,3,0,1,0,0,0],
  [1,0,9,8,0,4,6,2,3],
  [9,0,7,4,0,0,0,0,0],
  [0,4,5,0,0,0,2,0,9],
  [0,0,0,0,3,0,0,7,0],
]

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

function App() {
  const [sudokuArr, setSudokuArr] = useState()
  const [data, setData] = useState(false)
  const [puzzleUploadPlay, setPuzzleUploadPlay] = useState(null)
  const [puzzleUpload, setPuzzleUpload] = useState(null)

  const [myOwnBoard, setMyOwnBoard] = useState([])

  console.log("cek dataArr", sudokuArr);
  console.log("cek data", puzzleUploadPlay);
  console.log("cek tipe data dataArr",typeof sudokuArr);
  console.log("cek tipe data data",typeof puzzleUploadPlay);

  useEffect(() => {
    if(puzzleUploadPlay !== null) {
      setSudokuArr(puzzleUploadPlay)
      setData(true)
    }
  }, [puzzleUploadPlay])

  // useEffect(() => {
  //   if(myOwnBoard !== 0) {
  //     setSudokuArr(myOwnBoard)
  //     setData(true)
  //   }
  // }, [myOwnBoard])

  function clearBoard() {
    setSudokuArr([])
    setData(false)
  }

  function playGame() {
    setSudokuArr(initialPuzzle)
    setData(true)
  }

  function jsonFunction(e) {
    return JSON.parse(JSON.stringify(e))
  }

  function resetGame() {
    if(puzzleUpload !== null) {
      let sudoku = jsonFunction(puzzleUpload)
      return setSudokuArr(sudoku)
    } else {
      let sudoku = jsonFunction(initialPuzzle)
      return setSudokuArr(sudoku)
    }
  }

  function ownBoard() {
    setSudokuArr(customPuzzle)
    setData(true)
  }

  // function playOwnBoard() {
  //   setMyOwnBoard(sudokuArr)
  //   setData(true)
  // }

  function onInputChange(e, row, col) {
    let val   = parseInt(e.target.value) || 0
    let grid  = jsonFunction(sudokuArr)
    
    if(val === 0 || val >=1 && val <= 9) {
      grid[row][col] = val
    }

    setSudokuArr(grid)
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsText(file)
    reader.onload = () => {
      const data    = reader.result.split(/[\r\n]+/)
      const result  = []

      for(let v of data) {
        // console.log(JSON.parse(v));
        result.push(JSON.parse(v));
      }

      setPuzzleUpload(result)
      setPuzzleUploadPlay(result)
    }
    reader.onerror = () =>{
      console.log("file error", reader.error);
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3>Sudoku Game</h3>
        <h4>{sudokuArr}</h4>
        <table>
          <tbody>
            {
              [0,1,2,3,4,5,6,7,8].map((row, rowIndex) => {
                // console.log("liat baris", row);
                // if((row + 1) %3 === 0) {
                //   console.log("hitung baris", row);
                // }
                return(
                  <tr key={rowIndex} className={(row + 1) %3 === 0 ? "board-border-bottom" : ""}>
                    {
                      [0,1,2,3,4,5,6,7,8].map((col, colIndex) => {
                        return(
                          <td key={rowIndex + colIndex} className={(col + 1) %3 === 0 ? "board-border-right" : ""}>
                            {data && data ? 
                              <input 
                              value={sudokuArr[row][col] === 0 ? '' : sudokuArr[row][col]} 
                              className="input-cell"
                              onChange={e => onInputChange(e, row, col)}
                              disabled={sudokuArr ? sudokuArr[row][col] !== 0 : setPuzzleUploadPlay[row][col] !== 0}
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
            <button className="game-button" onClick={ownBoard}>Make Own Board</button>
        </div>
        <div className="input-file-container">
            <br />
            <h4>{puzzleUploadPlay}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
