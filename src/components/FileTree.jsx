import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, Search, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { projectFolders } from '../data/projectFiles';

export default function FileTree({ files, activeFileId, onSelectFile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [collapsedFolders, setCollapsedFolders] = useState({});

  const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'core', label: 'Core' },
    { id: 'domain', label: 'Domain' },
    { id: 'services', label: 'Services' },
    { id: 'presentation', label: 'UI' },
    { id: 'android', label: 'Android' }
  ];

  const toggleFolder = (folderId) => {
    setCollapsedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const filteredFiles = files.filter((f) => {
    const matchesSearch =
      f.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.folder.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'core') return f.folderId === 'core';
    if (activeCategory === 'domain') return f.folderId.startsWith('domain');
    if (activeCategory === 'services') return f.folderId === 'services' || f.folderId === 'models';
    if (activeCategory === 'presentation') return f.folderId === 'presentation-providers' || f.folderId === 'root-wiring';
    if (activeCategory === 'android') return f.folderId === 'android-native';
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-[#DDE7E8]">
      
      {/* Sidebar Header & Search */}
      <div className="p-4 border-b border-[#EEF4F5] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#006D77]" />
            <span className="font-extrabold text-sm text-[#122326] tracking-tight">Project Explorer</span>
          </div>
          <span className="badge-tag bg-[#E0F3F5] text-[#006D77] text-[10px]">
            {files.length} Files
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8BA5A9] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search files or logic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[#FAF8F4] border border-[#DDE7E8] text-[#122326] placeholder-[#8BA5A9] focus:outline-none focus:border-[#006D77]"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#006D77] text-white shadow-xs'
                  : 'bg-[#FAF8F4] text-[#4A6367] hover:bg-[#E0F3F5] hover:text-[#006D77]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tree List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {projectFolders.map((folder) => {
          const folderFiles = filteredFiles.filter((f) => f.folderId === folder.id);
          if (folderFiles.length === 0 && searchQuery) return null;

          const isCollapsed = !!collapsedFolders[folder.id];

          return (
            <div key={folder.id} className="space-y-1">
              {/* Folder Header */}
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-[#FAF8F4] transition-colors group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#122326]">
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-[#8BA5A9]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#006D77]" />
                  )}
                  {isCollapsed ? (
                    <Folder className="w-4 h-4 text-[#8BA5A9]" />
                  ) : (
                    <FolderOpen className="w-4 h-4 text-[#006D77]" />
                  )}
                  <span className="truncate">{folder.name}</span>
                </div>
                <span className="text-[10px] text-[#8BA5A9] font-semibold bg-[#F2F7F8] px-1.5 py-0.5 rounded-md">
                  {folderFiles.length}
                </span>
              </button>

              {/* Files in Folder */}
              {!isCollapsed && (
                <div className="pl-4 space-y-1 border-l-2 border-[#EEF4F5] ml-3 mt-1">
                  {folderFiles.map((file) => {
                    const isActive = file.id === activeFileId;
                    return (
                      <button
                        key={file.id}
                        onClick={() => onSelectFile(file.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                          isActive
                            ? 'bg-[#006D77] text-white shadow-sm shadow-[#006D77]/20 font-bold'
                            : 'text-[#4A6367] hover:bg-[#FAF8F4] hover:text-[#122326]'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs truncate">
                          <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#E29578]' : 'text-[#8BA5A9]'}`} />
                          <span className="truncate">{file.fileName}</span>
                        </div>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#E0F3F5] text-[#006D77]'
                          }`}
                        >
                          {file.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
