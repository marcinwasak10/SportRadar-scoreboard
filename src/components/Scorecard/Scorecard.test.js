import { render, screen, fireEvent } from '@testing-library/react';
import Scorecard from './Scorecard';

test('renders title', () => {
  render(
    <Scorecard
      game={{
        "id": 2,
        "homeTeam": {
            "name": "USA",
            "score": 0
        },
        "awayTeam": {
            "name": "ENG",
            "score": 0
        },
        "inProgress": true
      }}
      endGame={jest.fn()}
    />
  );
  const titleElement = screen.queryByText('Score');
  expect(titleElement).toBeInTheDocument();
});

test('renders score', () => {
  const { container } = render(
    <Scorecard
      game={{
        "id": 2,
        "homeTeam": {
            "name": "USA",
            "score": 0
        },
        "awayTeam": {
            "name": "ENG",
            "score": 0
        },
        "inProgress": true
      }}
      endGame={jest.fn()}
    />
  );
  const scoreElement = container.querySelector('.score-card-score');
  expect(scoreElement).toHaveTextContent('USA 0 - 0 ENG');
});

test('renders end game button', () => {
  const { container } = render(
    <Scorecard
      game={{
        "id": 2,
        "homeTeam": {
            "name": "USA",
            "score": 0
        },
        "awayTeam": {
            "name": "ENG",
            "score": 0
        },
        "inProgress": true
      }}
      endGame={jest.fn()}
    />
  );
  const endGameButtonElement = container.querySelector('.end-game-button');
  expect(endGameButtonElement).toBeInTheDocument();
  expect(endGameButtonElement).toHaveTextContent('End game');
});

test('calls the endGame function when the button is clicked', () => {
  const endGame = jest.fn();
  const gameId = 2;
  const { container } = render(
    <Scorecard
      game={{
        "id": gameId,
        "homeTeam": {
            "name": "USA",
            "score": 0
        },
        "awayTeam": {
            "name": "ENG",
            "score": 0
        },
        "inProgress": true
      }}
      endGame={endGame}
    />
  );
  const endGameButtonElement = container.querySelector('.end-game-button');
  fireEvent.click(endGameButtonElement);

  expect(endGame).toHaveBeenCalledTimes(1);
  expect(endGame).toHaveBeenCalledWith(gameId);
});
