import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from './Scoreboard';

test('renders title', () => {
  render(<Scoreboard />);
  const titleElement = screen.getByText('Scoreboard');
  expect(titleElement).toBeInTheDocument();
});

test('renders the start game component', () => {
  render(<Scoreboard />);
  const startGameElement = screen.getByText('Start new game');
  expect(startGameElement).toBeInTheDocument();
})

test('renders no scorecards if there are no games in progress', () => {
  render(<Scoreboard />);
  const scorecardElement = screen.queryByText('Score', { exact: true });
  expect(scorecardElement).not.toBeInTheDocument();
})

test('displays a scorecard correctly', () => {
  const { container } = render(<Scoreboard />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');
  const startGameButton = container.querySelector('#start-game-button');

  fireEvent.change(homeTeamNameInput, { target: { value: 'ARG' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'MEX' } });
  fireEvent.click(startGameButton);

  const scorecardElement = screen.queryByText('Score', { exact: true });
  expect(scorecardElement).toBeInTheDocument();
})

test('displays a correct number of scorecards', async () => {
  const { container } = render(<Scoreboard />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');
  const startGameButton = container.querySelector('#start-game-button');

  fireEvent.change(homeTeamNameInput, { target: { value: 'ARG' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'MEX' } });
  fireEvent.click(startGameButton);

  fireEvent.change(homeTeamNameInput, { target: { value: 'FRA' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'DEN' } });
  fireEvent.click(startGameButton);

  fireEvent.change(homeTeamNameInput, { target: { value: 'URU' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'GHA' } });
  fireEvent.click(startGameButton);

  const scorecardElements = await screen.findAllByText('Score', { exact: true });
  expect(scorecardElements).toHaveLength(3);
})

test('displays scorecards in a correct order', () => {
  const { container } = render(<Scoreboard />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');
  const startGameButton = container.querySelector('#start-game-button');

  fireEvent.change(homeTeamNameInput, { target: { value: 'ARG' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'MEX' } });
  fireEvent.click(startGameButton);

  fireEvent.change(homeTeamNameInput, { target: { value: 'FRA' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'DEN' } });
  fireEvent.click(startGameButton);

  const scorecardElements = container.querySelectorAll('.score-card');
  expect(scorecardElements).toHaveLength(2);
  expect(scorecardElements[0]).toHaveTextContent('FRA');
  expect(scorecardElements[1]).toHaveTextContent('ARG');
})

test('hides the scorecard for an ended game', () => {
  const { container } = render(<Scoreboard />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');
  const startGameButton = container.querySelector('#start-game-button');

  fireEvent.change(homeTeamNameInput, { target: { value: 'ARG' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'MEX' } });
  fireEvent.click(startGameButton);

  fireEvent.change(homeTeamNameInput, { target: { value: 'FRA' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'DEN' } });
  fireEvent.click(startGameButton);

  const endGameButton = container.querySelector('#score-card-0 .end-game-button');
  fireEvent.click(endGameButton);

  const scorecardElements = container.querySelectorAll('.score-card');
  expect(scorecardElements).toHaveLength(1);
  expect(scorecardElements[0]).toHaveTextContent('FRA');
})

test('changes the scorecard order when the score is updated', () => {
  const { container } = render(<Scoreboard />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');
  const startGameButton = container.querySelector('#start-game-button');

  fireEvent.change(homeTeamNameInput, { target: { value: 'ARG' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'MEX' } });
  fireEvent.click(startGameButton);

  fireEvent.change(homeTeamNameInput, { target: { value: 'FRA' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'DEN' } });
  fireEvent.click(startGameButton);

  const modifyScoreButton = container.querySelector('#score-card-1 .modify-score-button');
  fireEvent.click(modifyScoreButton);

  const homeTeamScoreInput = container.querySelector('#game-1-home-team-score-input');
  const awayTeamScoreInput = container.querySelector('#game-1-away-team-score-input');

  fireEvent.change(homeTeamScoreInput, { target: { value: 2 } });
  fireEvent.change(awayTeamScoreInput, { target: { value: 1 } });

  fireEvent.click(modifyScoreButton);

  const scorecardElements = container.querySelectorAll('.score-card');
  expect(scorecardElements).toHaveLength(2);
  expect(scorecardElements[0]).toHaveTextContent('FRA 2 - 1 DEN');
  expect(scorecardElements[1]).toHaveTextContent('ARG 0 - 0 MEX');
})
