import React, { useState } from 'react';

const Scorecard = ({
  game,
  endGame,
  updateScore,
}) => {
  const { homeTeam, awayTeam, id } = game;
  const [isEditMode, setIsEditMode] = useState(false);
  const [score, setScore] = useState({
    homeTeamScore: homeTeam?.score || 0,
    awayTeamScore: awayTeam?.score || 0,
  });

  const handleScoreChange = (event, team) => {
    setScore({
      ...score,
      [`${team}TeamScore`]: Math.round(Number(event.target.value)),
    })
  }

  const handleUpdateScoreButtonClick = () => {
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }

    updateScore({
      gameId: id,
      ...score,
    })
    setIsEditMode(false);
  }

  const renderScore = (team) => {
    if (isEditMode) {
      return (
        <input
          id={`game-${id}-${team}-team-score-input`}
          type="number"
          min={0}
          step={1}
          value={score[`${team}TeamScore`]}
          onChange={(e) => handleScoreChange(e, team)}
        />
      )
    } else {
      return <strong> {game[`${team}Team`].score} </strong>
    }
  }

  return (
    <div className='score-card' id={`score-card-${id}`} style={{margin: '10px', padding: '0 20px 20px', border: '1px solid grey'}}>
      <h5>Score</h5>
      <div className='score-card-score'>
        {homeTeam?.name} 
        {renderScore('home')}
        <strong>-</strong>
        {renderScore('away')}
        {awayTeam?.name}</div>
      <button className='update-score-button' type='button' onClick={() => handleUpdateScoreButtonClick()}>{isEditMode ? 'OK' : 'Update score'}</button>
      <button className='end-game-button' type='button' onClick={() => endGame(id)}>End game</button>
    </div>
  )
};

export default Scorecard;