import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// This is a simple test to demonstrate testing setup
describe('Example test', () => {
  it('renders without crashing', () => {
    // This test will pass as long as the component renders
    render(<div data-testid="test-element">Test Component</div>);
    
    // Check if the element is in the document
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Test Component');
  });
});
