import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FileTree from '../FileTree';
import { projectFiles } from '../../data/projectFiles';

describe('FileTree Component', () => {
  it('renders project explorer with file count', () => {
    render(
      <FileTree
        files={projectFiles}
        activeFileId="core-utils"
        onSelectFile={vi.fn()}
      />
    );

    expect(screen.getByText('Project Explorer')).toBeInTheDocument();
    expect(screen.getByText(`${projectFiles.length} Files`)).toBeInTheDocument();
  });

  it('filters files based on search input', () => {
    render(
      <FileTree
        files={projectFiles}
        activeFileId="core-utils"
        onSelectFile={vi.fn()}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search files or logic...');
    fireEvent.change(searchInput, { target: { value: 'utils.dart' } });

    expect(screen.getByText('utils.dart')).toBeInTheDocument();
    expect(screen.queryByText('theme.dart')).not.toBeInTheDocument();
  });

  it('triggers onSelectFile when a file item is clicked', () => {
    const onSelectFileMock = vi.fn();

    render(
      <FileTree
        files={projectFiles}
        activeFileId="core-utils"
        onSelectFile={onSelectFileMock}
      />
    );

    const themeFile = screen.getByText('theme.dart');
    fireEvent.click(themeFile);

    expect(onSelectFileMock).toHaveBeenCalledWith('core-theme');
  });
});
