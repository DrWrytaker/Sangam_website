import { useState } from 'react';
import { Copy, Check, Info, AlertTriangle, Store, Code, Camera, ShieldCheck, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export default function CodeViewer({ file, prevFile, nextFile, onSelectFile }) {
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-[#4A6367]">
        Select a file from the explorer to inspect its code and architecture rationale.
      </div>
    );
  }

  const snippet = file.snippets[selectedSnippetIdx] || file.snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
      
      {/* File Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#DDE7E8] shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#006D77]">
              <span>{file.folder}/</span>
              <span className="font-bold text-[#122326]">{file.fileName}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#122326] mt-1">{file.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge-tag bg-[#E0F3F5] text-[#006D77] text-xs">
              {file.category}
            </span>
            <span className="badge-tag bg-[#FFF0EB] text-[#E29578] text-xs border border-[#E29578]/30">
              {file.badge}
            </span>
          </div>
        </div>

        <p className="text-sm text-[#4A6367] leading-relaxed border-t border-[#EEF4F5] pt-3">
          {file.overview}
        </p>

        {/* Snippet Selector (if multiple snippets) */}
        {file.snippets.length > 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {file.snippets.map((snip, idx) => (
              <button
                key={snip.id}
                onClick={() => setSelectedSnippetIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSnippetIdx === idx
                    ? 'bg-[#006D77] text-white shadow-sm'
                    : 'bg-[#F2F7F8] text-[#4A6367] hover:bg-[#E0F3F5] hover:text-[#006D77]'
                }`}
              >
                {snip.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Code Display Station */}
      <div className="bg-[#122326] rounded-2xl overflow-hidden border border-[#2A4448] shadow-xl shadow-[#006D77]/5">
        {/* Code Header */}
        <div className="px-5 py-3 bg-[#0D191B] border-b border-[#2A4448] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E11D48]/80" />
            <span className="w-3 h-3 rounded-full bg-[#E29578]/80" />
            <span className="w-3 h-3 rounded-full bg-[#059669]/80" />
            <span className="text-xs font-mono text-[#8BA5A9] ml-2">{snippet.title}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2A4448]/60 text-xs text-[#E0F3F5] hover:bg-[#2A4448] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#059669]" />
                <span className="text-[#059669] font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8BA5A9]" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <div className="p-5 overflow-x-auto text-xs font-mono text-[#E0F3F5] leading-relaxed">
          <pre>
            <code>{snippet.code}</code>
          </pre>
        </div>
      </div>

      {/* Deep Rationale & Explanatory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Why this code was written */}
        <div className="bg-white p-5 rounded-2xl border border-[#DDE7E8] space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-[#006D77]">
            <Info className="w-4 h-4 text-[#006D77]" />
            <h4 className="font-extrabold text-sm text-[#122326]">Why this code was written</h4>
          </div>
          <p className="text-xs text-[#4A6367] leading-relaxed">
            {snippet.whyWritten}
          </p>
        </div>

        {/* What would break if removed */}
        <div className="bg-white p-5 rounded-2xl border border-[#DDE7E8] space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-[#E11D48]">
            <AlertTriangle className="w-4 h-4 text-[#E11D48]" />
            <h4 className="font-extrabold text-sm text-[#122326]">What would break if removed?</h4>
          </div>
          <p className="text-xs text-[#4A6367] leading-relaxed">
            {snippet.whatBreaksIfRemoved}
          </p>
        </div>

      </div>

      {/* Line-by-Line Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-[#DDE7E8] space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-[#006D77]" />
          <h4 className="font-extrabold text-sm text-[#122326]">Line-by-Line Technical Breakdown</h4>
        </div>

        <div className="space-y-2.5">
          {snippet.lineByLine.map((line, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAF8F4] border border-[#EEF4F5] text-xs">
              <span className="w-5 h-5 rounded-full bg-[#E0F3F5] text-[#006D77] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-[#334E52] leading-relaxed font-medium">{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World Kirana Story */}
      <div className="bg-gradient-to-br from-[#FFF0EB] via-[#FAF8F4] to-[#E0F3F5] p-5 rounded-2xl border border-[#E29578]/30 space-y-2">
        <div className="flex items-center gap-2 text-[#C45C12]">
          <Store className="w-4 h-4 text-[#C45C12]" />
          <h4 className="font-extrabold text-sm text-[#122326]">Real-World Kirana Counter Scenario</h4>
        </div>
        <p className="text-xs text-[#4A6367] leading-relaxed font-medium italic">
          "{snippet.kiranaScenario}"
        </p>
      </div>

      {/* Visual Live App Counterpart (if available) */}
      {file.realScreenMedia && (
        <div className="bg-white p-6 rounded-2xl border border-[#DDE7E8] space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#006D77]">
              <Camera className="w-4 h-4 text-[#006D77]" />
              <h4 className="font-extrabold text-sm text-[#122326]">Live App Visual Counterpart</h4>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F3F5] text-[#006D77] text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-[#059669]" />
              PII Masked
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-4 flex justify-center">
              <div className="w-36 aspect-[9/19] rounded-2xl overflow-hidden border-2 border-[#122326] shadow-md bg-black">
                <img 
                  src={file.realScreenMedia.image} 
                  alt={file.realScreenMedia.caption} 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="sm:col-span-8 space-y-2">
              <h5 className="font-bold text-sm text-[#122326]">{file.realScreenMedia.caption}</h5>
              <p className="text-xs text-[#4A6367] leading-relaxed">
                {file.realScreenMedia.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sequential File Navigation Footer */}
      <div className="pt-4 border-t border-[#DDE7E8] flex flex-col sm:flex-row items-center justify-between gap-3">
        {prevFile && onSelectFile ? (
          <button
            onClick={() => onSelectFile(prevFile.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDE7E8] text-xs font-bold text-[#122326] hover:border-[#006D77] hover:text-[#006D77] transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#006D77]" />
            <span className="truncate max-w-[150px]">Prev: {prevFile.fileName}</span>
          </button>
        ) : <div />}

        <a
          href="https://github.com/DrWrytaker/sangam_okcredit"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6367] hover:text-[#006D77] transition-colors"
        >
          <span>Explore Full Codebase on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {nextFile && onSelectFile ? (
          <button
            onClick={() => onSelectFile(nextFile.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#006D77] text-white text-xs font-bold shadow-sm shadow-[#006D77]/20 hover:bg-[#004E56] transition-all"
          >
            <span className="truncate max-w-[150px]">Next: {nextFile.fileName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : <div />}
      </div>

    </div>
  );
}
