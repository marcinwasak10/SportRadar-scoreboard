import { render, screen } from '@testing-library/react';
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
    />
  );
  const scoreElement = container.querySelector('.score-card-score');
  expect(scoreElement).toHaveTextContent('USA 0 - 0 ENG');
});
