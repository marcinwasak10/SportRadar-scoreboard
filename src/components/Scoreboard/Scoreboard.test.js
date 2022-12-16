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
  expect(scorecardElements[0]).toHaveTextContent('FRA');
  expect(scorecardElements[1]).toHaveTextContent('ARG');
})
