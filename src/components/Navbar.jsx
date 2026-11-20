import { Code2, Cpu, Smartphone, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenPrivacy }) {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-[#DDE7E8] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActivePage('showcase')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008B96] via-[#006D77] to-[#004E56] flex items-center justify-center text-white shadow-md shadow-[#006D77]/20 group-hover:scale-105 transition-transform">
            <span className="font-bold text-xl tracking-wider">सं</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#122326]">Sangam</span>
              <span className="badge-tag bg-[#E0F3F5] text-[#006D77] text-[10px] uppercase font-bold tracking-wider">
                OkCredit POC
              </span>
            </div>
            <p className="text-[11px] text-[#4A6367] font-medium hidden sm:block">
              सबका एक हिसाब — <span className="text-[#006D77] font-semibold">One ledger for everyone</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#EEF4F5] p-1.5 rounded-2xl border border-[#DDE7E8]">
          <button
            onClick={() => setActivePage('showcase')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activePage === 'showcase'
                ? 'bg-white text-[#006D77] shadow-sm'
                : 'text-[#4A6367] hover:text-[#122326]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
            <span>App Showcase</span>
          </button>

          <button
            onClick={() => setActivePage('code')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activePage === 'code'
                ? 'bg-white text-[#006D77] shadow-sm'
                : 'text-[#4A6367] hover:text-[#122326]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#006D77]" />
            <span>Learning the Code</span>
          </button>

          <button
            onClick={() => setActivePage('architecture')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activePage === 'architecture'
                ? 'bg-white text-[#006D77] shadow-sm'
                : 'text-[#4A6367] hover:text-[#122326]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#5F259F]" />
            <span>Learning the App</span>
          </button>
        </div>

        {/* GitHub & Quick Action */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#006D77] bg-[#E0F3F5]/60 hover:bg-[#E0F3F5] border border-[#006D77]/20 rounded-xl transition-all"
            title="Sangam Zero-Cloud & Privacy Architecture"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            <span>Privacy</span>
          </button>
          <a
            href="https://github.com/DrWrytaker/sangam_okcredit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#122326] hover:text-[#006D77] border border-[#DDE7E8] rounded-xl bg-white hover:bg-[#F2F7F8] transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-[#4A6367]" />
          </a>
          <button
            onClick={() => setActivePage('simulator')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#006D77] to-[#004E56] rounded-xl shadow-md shadow-[#006D77]/25 hover:shadow-lg hover:shadow-[#006D77]/35 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#E29578]" />
            <span>Try Simulator</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
