import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RoiCalculator from '../RoiCalculator';

describe('RoiCalculator Component', () => {
  it('renders correctly with default values and presets', () => {
    render(<RoiCalculator />);
    expect(screen.getByText('How Much Does Sangam Save Your Shop Annually?')).toBeInTheDocument();
    expect(screen.getByText('Chai / Paan Stall')).toBeInTheDocument();
    expect(screen.getByText('Neighborhood Kirana')).toBeInTheDocument();
    expect(screen.getByText('Wholesale General Store')).toBeInTheDocument();
    expect(screen.getByText('Soundbox Rent Saved')).toBeInTheDocument();
  });

  it('updates metrics when clicking a preset', () => {
    render(<RoiCalculator />);
    
    // Click 'Chai / Paan Stall' preset
    const chaiPreset = screen.getByText('Chai / Paan Stall');
    fireEvent.click(chaiPreset);

    // Active preset badge should update accounts to 25 Accounts
    expect(screen.getByText('25 Accounts')).toBeInTheDocument();
  });

  it('updates soundbox count and displays correct rental savings', () => {
    render(<RoiCalculator />);
    
    // Select 2 soundboxes: button text is '2 Soundbox'
    const twoSoundboxes = screen.getByText('2 Soundbox');
    fireEvent.click(twoSoundboxes);

    // 2 soundboxes * 125/mo * 12 = 3000/yr saved
    expect(screen.getByText('₹3,000')).toBeInTheDocument();
  });
});
