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
      modifyScore={jest.fn()}
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
      modifyScore={jest.fn()}
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
      modifyScore={jest.fn()}
    />
  );
  const endGameButtonElement = container.querySelector('.end-game-button');
  expect(endGameButtonElement).toBeInTheDocument();
  expect(endGameButtonElement).toHaveTextContent('End game');
});

test('renders modifyScore button', () => {
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
      modifyScore={jest.fn()}
    />
  );
  const modifyScoreButtonElement = container.querySelector('.modify-score-button');
  expect(modifyScoreButtonElement).toBeInTheDocument();
  expect(modifyScoreButtonElement).toHaveTextContent('Modify score');
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
      modifyScore={jest.fn()}
    />
  );
  const endGameButtonElement = container.querySelector('.end-game-button');
  fireEvent.click(endGameButtonElement);

  expect(endGame).toHaveBeenCalledTimes(1);
  expect(endGame).toHaveBeenCalledWith(gameId);
});

test('shows the score inputs when the modify score button is clicked', () => {
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
      endGame={jest.fn()}
      modifyScore={jest.fn()}
    />
  );

  const modifyScoreButton = container.querySelector('.modify-score-button');
  fireEvent.click(modifyScoreButton);
  expect(modifyScoreButton).toHaveTextContent('OK');

  const homeTeamScoreInput = container.querySelector(`#game-${gameId}-home-team-score-input`);
  const awayTeamScoreInput = container.querySelector(`#game-${gameId}-away-team-score-input`);

  expect(homeTeamScoreInput).toBeInTheDocument();
  expect(awayTeamScoreInput).toBeInTheDocument();
})

test('calls the modifyScore function when the modify score button is clicked with inputs changed', () => {
  const modifyScore = jest.fn();
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
      endGame={jest.fn()}
      modifyScore={modifyScore}
    />
  );

  const modifyScoreButton = container.querySelector('.modify-score-button');
  fireEvent.click(modifyScoreButton);

  const homeTeamScoreInput = container.querySelector(`#game-${gameId}-home-team-score-input`);
  const awayTeamScoreInput = container.querySelector(`#game-${gameId}-away-team-score-input`);

  fireEvent.change(homeTeamScoreInput, { target: { value: 2 } });
  fireEvent.change(awayTeamScoreInput, { target: { value: 1 } });

  fireEvent.click(modifyScoreButton);

  expect(modifyScore).toHaveBeenCalledTimes(1);
  expect(modifyScore).toHaveBeenCalledWith({
    gameId,
    homeTeamScore: 2,
    awayTeamScore: 1,
  });
})
