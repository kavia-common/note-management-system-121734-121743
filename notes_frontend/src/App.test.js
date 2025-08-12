import { render, screen } from '@testing-library/react';
import App from './App';

test('renders editor title input and body textarea', () => {
  render(<App />);
  const titleInput = screen.getByPlaceholderText(/title/i);
  const bodyTextarea = screen.getByPlaceholderText(/type your note/i);

  expect(titleInput).toBeInTheDocument();
  expect(bodyTextarea).toBeInTheDocument();
});
