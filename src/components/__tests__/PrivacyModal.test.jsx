import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrivacyModal from '../PrivacyModal';

describe('PrivacyModal Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<PrivacyModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when isOpen is true', () => {
    render(<PrivacyModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Privacy & Data Governance Policy — Sangam/i)).toBeInTheDocument();
    expect(screen.getByText('Zero Cloud Leakage Guarantee')).toBeInTheDocument();
    expect(screen.getByText('1. On-Device Storage & SQLite')).toBeInTheDocument();
    expect(screen.getByText('2. Notification & UPI Interception')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<PrivacyModal isOpen={true} onClose={handleClose} />);
    
    const closeBtn = screen.getByLabelText('Close Privacy Policy');
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders one-click data purge guarantee', () => {
    render(<PrivacyModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('4. One-Click Data Erasure')).toBeInTheDocument();
  });
});
