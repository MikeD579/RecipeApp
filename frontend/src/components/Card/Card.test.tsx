import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { Button } from '../Button';

describe('Card Component', () => {
  it('renders the correct title and content', () => {
    render(<Card title="Test Title" content="This is a test content." styleName="custom-style" />);

    const title = screen.getByText(/test title/i);
    const content = screen.getByText(/this is a test content./i);

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('renders components within the content of the card', () => {
    render(
      <Card
        title="Component Test"
        content={
          <Button
            label="Click Me"
            onClick={() => { }}
            variant="secondary"
          />
        }
      />
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
});