import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import KiranaSimulator from '../KiranaSimulator';

describe('KiranaSimulator Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders initial state with customer balance of ₹1450', () => {
    render(<KiranaSimulator />);
    expect(screen.getByText('₹1450')).toBeInTheDocument();
    expect(screen.getByText('Customer: Ramesh Kumar')).toBeInTheDocument();
    expect(screen.getByText('No unassigned payments')).toBeInTheDocument();
  });

  it('simulates PhonePe payment and enqueues payment item', () => {
    render(<KiranaSimulator />);
    
    // Find the PhonePe trigger button
    const phonePeButton = screen.getByText('PhonePe').closest('button');
    expect(phonePeButton).toBeInTheDocument();

    fireEvent.click(phonePeButton);

    // Fast-forward timeout for queue insertion
    act(() => {
      vi.advanceTimersByTime(700);
    });

    // Should see ₹350 in queue
    expect(screen.getAllByText('From: Ramesh Kumar').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Deduct Udhar')).toBeInTheDocument();
  });

  it('reconciles payment and reduces outstanding customer debt', () => {
    render(<KiranaSimulator />);
    
    // Click PhonePe (₹350)
    const phonePeButton = screen.getByText('PhonePe').closest('button');
    fireEvent.click(phonePeButton);

    act(() => {
      vi.advanceTimersByTime(700);
    });

    // Click Deduct Udhar
    const deductBtn = screen.getByText('Deduct Udhar');
    fireEvent.click(deductBtn);

    // Debt should reduce from ₹1450 - ₹350 = ₹1100
    expect(screen.getByText('₹1100')).toBeInTheDocument();
  });

  it('resets simulator state when Reset button is clicked', () => {
    render(<KiranaSimulator />);
    
    const phonePeButton = screen.getByText('PhonePe').closest('button');
    fireEvent.click(phonePeButton);

    act(() => {
      vi.advanceTimersByTime(700);
    });

    const resetBtn = screen.getByText('Reset');
    fireEvent.click(resetBtn);

    expect(screen.getByText('₹1450')).toBeInTheDocument();
    expect(screen.getByText('No unassigned payments')).toBeInTheDocument();
  });
});
