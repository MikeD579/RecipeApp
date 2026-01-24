import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders the correct label', () => {
    render(<Button label="Scrape Recipe" onClick={() => { }} />);

    // We search by "role" (accessibility first!)
    const button = screen.getByRole('button', { name: /scrape recipe/i });
    expect(button).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', async () => {
    const handleClick = vi.fn(); // Create a "spy" function
    const user = userEvent.setup();

    render(<Button label="Click Me" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    // Check if our spy function was called exactly once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});