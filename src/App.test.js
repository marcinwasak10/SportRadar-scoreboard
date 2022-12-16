import { render } from '@testing-library/react';
import App from './App';

test('renders app container', () => {
  const { container } = render(<App />);
  const appContainerElement = container.querySelector('.App');
  expect(appContainerElement).toBeInTheDocument();
});
