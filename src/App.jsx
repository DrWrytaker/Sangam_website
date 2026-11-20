import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ShowcasePage from './pages/ShowcasePage';
import PrivacyModal from './components/PrivacyModal';
import { ExternalLink, Loader2, ShieldCheck } from 'lucide-react';

import KiranaSimulator from './components/KiranaSimulator';

const CodeExplorerPage = lazy(() => import('./pages/CodeExplorerPage'));
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage'));

function RouteLoading() {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-12 text-[#006D77] space-y-3">
      <Loader2 className="w-8 h-8 animate-spin text-[#006D77]" />
      <p className="text-xs font-bold text-[#4A6367] tracking-wider uppercase">Loading Section...</p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('showcase');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F6] text-[#122326]">
      {/* Navigation Header */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activePage === 'showcase' && (
          <ShowcasePage
            onExploreCode={() => setActivePage('code')}
            onExploreArch={() => setActivePage('architecture')}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
          />
        )}

        <Suspense fallback={<RouteLoading />}>
          {activePage === 'code' && <CodeExplorerPage />}
          {activePage === 'architecture' && <ArchitecturePage />}
          {activePage === 'simulator' && (
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
              <KiranaSimulator />
            </div>
          )}
        </Suspense>
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-[#DDE7E8] py-8 px-4 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A6367]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#006D77] flex items-center justify-center text-white font-bold text-xs">
              सं
            </div>
            <span className="font-bold text-[#122326]">Sangam (सबका एक हिसाब)</span>
            <span>· Built for the OkCredit Finternship Hackathon</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActivePage('code')}
              className="hover:text-[#006D77] transition-colors"
            >
              Code Explorer
            </button>
            <button
              onClick={() => setActivePage('architecture')}
              className="hover:text-[#006D77] transition-colors"
            >
              Architecture Guide
            </button>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="flex items-center gap-1 hover:text-[#006D77] transition-colors font-medium text-[#006D77]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>Privacy Policy</span>
            </button>
            <a
              href="https://github.com/DrWrytaker/sangam_okcredit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#006D77] transition-colors"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Zero-Cloud Privacy Guarantee Modal */}
      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </div>
  );
}
