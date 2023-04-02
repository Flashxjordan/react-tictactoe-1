import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Board from './Board';

import './Game.css';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const squaresCopy = [...squares];
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every((square) => square !== null)) {
    status = 'Draw!';
  } else {
    status = `It's player ${xIsNext ? 'X' : 'O'}'s turn`;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ mb: 2 }} marginTop={10}>
        <Typography variant="h4">Tic Tac Toe</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">{status}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Board squares={squares} onClick={handleClick} />
      </Box>
      <Box>
        <Typography variant="h6" align="center" > Score Tracker </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
  <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '5px', mr: 2 }}>
    <Typography variant="h6" align="center">Player X</Typography>
    <Typography variant="h4" align="center">0</Typography>
  </Box>
  <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '5px', ml: 2 }}>
    <Typography variant="h6" align="center">Player O</Typography>
    <Typography variant="h4" align="center">0</Typography>
  </Box>
</Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <Button variant="contained" color="inherit" onClick={resetGame}>Reset</Button>
            </Box>

      </Box>
    </Box>
  );
}

export default Game;
