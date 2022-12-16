import React from 'react';

const Scorecard = ({ game = {} }) => {
  const { homeTeam, awayTeam, id } = game;

  return (
    <div className='score-card' id={`score-card-${id}`} style={{margin: '10px', padding: '0 20px 20px', border: '1px solid grey'}}>
      <h5>Score</h5>
      <div className='score-card-score'>{homeTeam?.name} <strong>{homeTeam?.score} - {awayTeam?.score}</strong> {awayTeam?.name}</div>
    </div>
  )
};

export default Scorecard;