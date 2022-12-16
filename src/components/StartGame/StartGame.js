import React, { useState } from 'react';

const StartGame = ({ startNewGame }) => {
  const initialState = {
    homeTeam: '',
    awayTeam: '',
  };

  const [matchInfo, setMatchInfo] = useState(initialState);

  const handleTeamNameChange = (event, team) => {
    setMatchInfo({
      ...matchInfo,
      [team]: event.target.value,
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      !matchInfo.homeTeam
      || !matchInfo.awayTeam
      || matchInfo.homeTeam === matchInfo.awayTeam
    ) return;
    startNewGame(matchInfo);
    setMatchInfo(initialState);
  }

  return (
    <form id="start-game" onSubmit={onSubmit}>
      <h4>Start new game</h4>
      <div>
        <label>
          Home team:
          <input id='home-team-name-input' type='text' value={matchInfo.homeTeam} onChange={(e) => handleTeamNameChange(e, 'homeTeam')} required />
        </label>
      </div>
      <div>
        <label>
          Away team:
          <input id='away-team-name-input' type='text' value={matchInfo.awayTeam} onChange={(e) => handleTeamNameChange(e, 'awayTeam')} required />
        </label>
      </div>
      <button id='start-game-button' type='submit'>Start</button>
    </form>
  )
};

export default StartGame;