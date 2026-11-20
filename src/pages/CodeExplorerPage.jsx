import React, { useState } from 'react';
import FileTree from '../components/FileTree';
import CodeViewer from '../components/CodeViewer';
import { projectFiles } from '../data/projectFiles';
import { PanelLeftClose, PanelLeftOpen, Code2 } from 'lucide-react';

export default function CodeExplorerPage() {
  const [activeFileId, setActiveFileId] = useState('core-utils');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeFile = projectFiles.find((f) => f.id === activeFileId) || projectFiles[0];

  const currentIdx = projectFiles.findIndex((f) => f.id === (activeFile?.id || activeFileId));
  const prevFile = currentIdx > 0 ? projectFiles[currentIdx - 1] : null;
  const nextFile = currentIdx >= 0 && currentIdx < projectFiles.length - 1 ? projectFiles[currentIdx + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-[#DDE7E8] mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006D77] text-white flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#122326]">Learning the Code</h2>
            <p className="text-xs text-[#4A6367]">
              Inspect every critical folder, file, and line of logic written in Sangam with detailed architectural explanations.
            </p>
          </div>
        </div>

        {/* Sidebar Toggle for Desktop & Mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDE7E8] text-xs font-semibold text-[#4A6367] hover:bg-[#F2F7F8] transition-colors"
        >
          {sidebarOpen ? (
            <>
              <PanelLeftClose className="w-4 h-4 text-[#006D77]" />
              <span className="hidden sm:inline">Hide Explorer</span>
            </>
          ) : (
            <>
              <PanelLeftOpen className="w-4 h-4 text-[#006D77]" />
              <span className="hidden sm:inline">Show Explorer</span>
            </>
          )}
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="bg-[#FAF8F4] rounded-3xl border border-[#DDE7E8] overflow-hidden shadow-sm flex flex-col md:flex-row h-[780px]">
        
        {/* Left Sidebar (FileTree) */}
        {sidebarOpen && (
          <div className="w-full md:w-80 h-72 md:h-full shrink-0 border-b md:border-b-0 md:border-r border-[#DDE7E8]">
            <FileTree
              files={projectFiles}
              activeFileId={activeFileId}
              onSelectFile={(id) => setActiveFileId(id)}
            />
          </div>
        )}

        {/* Right Main Viewer (CodeViewer) */}
        <CodeViewer 
          file={activeFile} 
          prevFile={prevFile}
          nextFile={nextFile}
          onSelectFile={(id) => setActiveFileId(id)}
        />

      </div>

    </div>
  );
}
