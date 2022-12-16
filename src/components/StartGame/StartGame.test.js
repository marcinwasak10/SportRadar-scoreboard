import { render, screen, fireEvent } from '@testing-library/react';
import StartGame from './StartGame';

test('renders title', () => {
  render(<StartGame />);
  const titleElement = screen.getByText('Start new game');
  expect(titleElement).toBeInTheDocument();
});

test('renders the inputs correctly', () => {
  const { container } = render(<StartGame />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');

  expect(homeTeamNameInput).toBeInTheDocument();
  expect(awayTeamNameInput).toBeInTheDocument();
});

test('renders the button correctly', () => {
  const { container } = render(<StartGame />);

  const startGameButton = container.querySelector('#start-game-button');

  expect(startGameButton).toBeInTheDocument();
});

test('calls the startNewGame function when the form is filled out correctly', () => {
  const startNewGame = jest.fn()
  const { container } = render(<StartGame startNewGame={startNewGame} />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');
  const startGameButton = container.querySelector('#start-game-button');

  fireEvent.change(homeTeamNameInput, { target: { value: 'ARG' } });
  fireEvent.change(awayTeamNameInput, { target: { value: 'MEX' } });
  fireEvent.click(startGameButton);

  expect(startNewGame).toHaveBeenCalledTimes(1);
  expect(startNewGame).toHaveBeenCalledWith({
    homeTeam: 'ARG',
    awayTeam: 'MEX',
  });
});

test('does not call the startNewGame function when the form is filled out incorrectly', () => {
  const startNewGame = jest.fn()
  const { container } = render(<StartGame startNewGame={startNewGame} />);

  const homeTeamNameInput = container.querySelector('#home-team-name-input');
  const awayTeamNameInput = container.querySelector('#away-team-name-input');
  const startGameButton = container.querySelector('#start-game-button');

  fireEvent.change(homeTeamNameInput, { target: { value: 'ARG' } });
  fireEvent.click(startGameButton);

  expect(startNewGame).toHaveBeenCalledTimes(0);

  fireEvent.change(awayTeamNameInput, { target: { value: 'ARG' } }); // home and away teams are the same
  fireEvent.click(startGameButton);

  expect(startNewGame).toHaveBeenCalledTimes(0);
});