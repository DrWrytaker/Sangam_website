import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CodeViewer from '../CodeViewer';
import { projectFiles } from '../../data/projectFiles';

describe('CodeViewer Component', () => {
  it('renders fallback message when file is null', () => {
    render(<CodeViewer file={null} />);
    expect(
      screen.getByText(/Select a file from the explorer/i)
    ).toBeInTheDocument();
  });

  it('renders file title, category, badge, and code snippet', () => {
    const file = projectFiles[0]; // core-utils
    render(<CodeViewer file={file} />);

    expect(screen.getByText(file.title)).toBeInTheDocument();
    expect(screen.getByText(file.category)).toBeInTheDocument();
    expect(screen.getByText(file.badge)).toBeInTheDocument();
    expect(screen.getByText('Why this code was written')).toBeInTheDocument();
    expect(screen.getByText('What would break if removed?')).toBeInTheDocument();
  });

  it('switches snippet tabs when clicked', () => {
    const file = projectFiles[0]; // has multiple snippets
    render(<CodeViewer file={file} />);

    // Click second snippet tab
    const secondSnippetTab = screen.getByText(file.snippets[1].title);
    fireEvent.click(secondSnippetTab);

    // Verifies second snippet content is active
    expect(screen.getByText(file.snippets[1].whyWritten)).toBeInTheDocument();
  });

  it('handles copy to clipboard action', () => {
    const file = projectFiles[0];
    render(<CodeViewer file={file} />);

    const copyBtn = screen.getByText('Copy Code');
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
