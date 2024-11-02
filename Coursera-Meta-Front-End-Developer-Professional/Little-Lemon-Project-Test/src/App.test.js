import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MainBookingPage from '../src/components/MainBookingPage';

describe('MainBookingPage', () => {
  it('renders without crashing', () => {
    render(<MainBookingPage />);
    expect(screen.getByText(/Little Lemon Restaurants Tables Reservation/i)).toBeInTheDocument();
  });

  it('handles form input changes correctly', () => {
    render(<MainBookingPage />);
    const dateInput = screen.getByPlaceholderText('Input Date');
    const timeInput = screen.getByPlaceholderText('Input Time');
    const guestsInput = screen.getByPlaceholderText('Number of Guests');

    fireEvent.change(dateInput, { target: { value: '2024-07-12' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    expect(dateInput.value).toBe('2024-07-12');
    expect(timeInput.value).toBe('18:00');
    expect(guestsInput.value).toBe('4');
  });

  it('disables button when form is invalid', () => {
    render(<MainBookingPage />);
    const button = screen.getByText(/Send Reservation/i);

    expect(button).toBeDisabled();
  });
});
