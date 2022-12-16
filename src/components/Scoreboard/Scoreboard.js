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

  const endGame = (gameId) => {
    const endingGameIndex = games.findIndex(game => game.id === gameId);

    setGames([
      ...games.slice(0, endingGameIndex),
      {
        ...games[endingGameIndex],
        inProgress: false
      },
      ...games.slice(endingGameIndex + 1),
    ])
  }

  const modifyScore = (score) => {
    const uneditedGames = games.filter(game => game.id !== score.gameId);
    const gameToUpdate = games.find(game => game.id === score.gameId);
    const updatedGame = {
      ...gameToUpdate,
      homeTeam: {
        ...gameToUpdate.homeTeam,
        score: score.homeTeamScore,
      },
      awayTeam: {
        ...gameToUpdate.awayTeam,
        score: score.awayTeamScore,
      },
    }

    const sameGoalTallyMatchIndex = uneditedGames.findIndex(
      game => game.homeTeam.score + game.awayTeam.score === score.homeTeamScore + score.awayTeamScore
    );

    if (sameGoalTallyMatchIndex >= 0) {
      setGames([
        ...uneditedGames.slice(0, sameGoalTallyMatchIndex),
        updatedGame,
        ...uneditedGames.slice(sameGoalTallyMatchIndex)
      ])
    } else {
      setGames([
        updatedGame,
        ...uneditedGames
      ])
    }
  }

  return <>
    <h1>Scoreboard</h1>
    <StartGame startNewGame={(matchInfo) => startNewGame(matchInfo)}/>
    {
      games
        .filter(game => game.inProgress)
        .map((game) => <Scorecard key={game.id} game={game} endGame={endGame} modifyScore={modifyScore} />)
    }
  </>
};

export default Scoreboard;