import React from 'react';

const Scorecard = ({
  game,
  endGame,
}) => {
  const { homeTeam, awayTeam, id } = game;
  return (
    <div className='score-card' id={`score-card-${id}`} style={{margin: '10px', padding: '0 20px 20px', border: '1px solid grey'}}>
      <h5>Score</h5>
      <div className='score-card-score'>{homeTeam?.name} <strong>{homeTeam?.score} - {awayTeam?.score}</strong> {awayTeam?.name}</div>
      <button className='end-game-button' type='button' onClick={() => endGame(id)}>End game</button>
    </div>
  )
};

export default Scorecard;