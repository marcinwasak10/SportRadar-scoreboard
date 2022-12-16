import React, { useState } from 'react';
import StartGame from '../StartGame/StartGame';
import Scorecard from '../Scorecard/Scorecard';

const Scoreboard = () => {
  const [games, setGames] = useState([]);

  const startNewGame = (matchInfo) => {
    const newGame = {
      id: games.length,
      homeTeam: {
        name: matchInfo.homeTeam,
        score: 0,
      },
      awayTeam: {
        name: matchInfo.awayTeam,
        score: 0,
      },
      inProgress: true,
    }

    const goallessGameIndex = games.findIndex(
      game => game.homeTeam.score === 0 && game.awayTeam.score === 0
    );

    if (goallessGameIndex < 0) {
      setGames([...games, newGame])
    } else {
      setGames([
        ...games.slice(0, goallessGameIndex),
        newGame,
        ...games.slice(goallessGameIndex)
      ]);
    }
  }

  return <>
    <h1>Scoreboard</h1>
    <StartGame startNewGame={(matchInfo) => startNewGame(matchInfo)}/>
    {
      games
        .filter(game => game.inProgress)
        .map((game) => <Scorecard key={game.id} game={game} />)
    }
  </>
};

export default Scoreboard;