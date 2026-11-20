import { useState, useEffect } from 'react';
import { architecturePipelines, securityMatrix } from '../data/architectureData';
import { Cpu, ShieldCheck, Database, CheckCircle2, XCircle, Play, Pause, RotateCcw, Key, Terminal } from 'lucide-react';

const SECURITY_SCENARIOS = [
  {
    role: 'owner',
    roleLabel: 'Shop Owner (Admin)',
    action: 'profit',
    actionLabel: "View Today's Net Profit & Margins",
    status: 200,
    allowed: true,
    rule: 'allow read: if request.auth.uid == resource.data.ownerUid;',
    reason: 'Store owner has master clearance to review store revenues, profit margins, and net balances.'
  },
  {
    role: 'staff_edit',
    roleLabel: 'Staff (canEdit: true)',
    action: 'profit',
    actionLabel: "View Today's Net Profit & Margins",
    status: 403,
    allowed: false,
    rule: 'allow read: if isOwner(shopId); // Staff excluded',
    reason: 'Staff are blocked at the Firestore tier from viewing store-level margins or bank payout configurations.'
  },
  {
    role: 'staff_edit',
    roleLabel: 'Staff (canEdit: true)',
    action: 'transaction',
    actionLabel: 'Record Customer Payment / Udhar',
    status: 200,
    allowed: true,
    rule: 'allow create, update: if isStaffWithEdit(shopId) || isOwner(shopId);',
    reason: 'Cashier with edit permission is authorized to record spot cash and UPI debt settlements.'
  },
  {
    role: 'staff_view',
    roleLabel: 'Staff (canEdit: false - View Only)',
    action: 'transaction',
    actionLabel: 'Record Customer Payment / Udhar',
    status: 403,
    allowed: false,
    rule: 'allow write: if isStaffWithEdit(shopId); // canEdit check failed',
    reason: 'View-only staff can inspect customer balances on the phone, but write transactions are cryptographically denied.'
  },
  {
    role: 'attacker',
    roleLabel: 'Unauthenticated / External Attacker',
    action: 'wipe',
    actionLabel: 'Delete Shop Data / Read All Dues',
    status: 401,
    allowed: false,
    rule: 'allow read, write: if request.auth != null && isStaffOrOwner(shopId);',
    reason: 'Anonymous cloud queries are rejected at the Google Cloud edge before database execution.'
  }
];

export default function ArchitecturePage() {
  const [selectedPipelineId, setSelectedPipelineId] = useState('upi-interception');
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isPlayingFlow, setIsPlayingFlow] = useState(false);

  // Security Simulator state
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);

  const activePipeline = architecturePipelines.find((p) => p.id === selectedPipelineId) || architecturePipelines[0];

  // Auto-play pipeline stepper
  useEffect(() => {
    let timer;
    if (isPlayingFlow) {
      timer = setInterval(() => {
        setActiveStepIdx((prev) => (prev + 1) % activePipeline.steps.length);
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlayingFlow, activePipeline.steps.length]);

  const scenario = SECURITY_SCENARIOS[selectedScenarioIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-12 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DDE7E8] space-y-2 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F3F5] text-[#006D77] text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-[#5F259F]" />
          <span>System Design & Security Model</span>
        </div>
        <h2 className="text-3xl font-black text-[#122326]">Learning the App Architecture</h2>
        <p className="text-sm text-[#4A6367] max-w-2xl">
          Dive into the architectural flows that make Sangam resilient: zero-touch Android interception, Groq AI fallbacks, and zero-cost multi-user security rules.
        </p>
      </div>

      {/* ── 1. Interactive Pipeline Stepper ── */}
      <section className="space-y-6">
        
        {/* Pipeline Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {architecturePipelines.map((pipeline) => (
              <button
                key={pipeline.id}
                onClick={() => {
                  setSelectedPipelineId(pipeline.id);
                  setActiveStepIdx(0);
                  setIsPlayingFlow(false);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedPipelineId === pipeline.id
                    ? 'bg-[#006D77] text-white shadow-md shadow-[#006D77]/20'
                    : 'bg-white text-[#4A6367] border border-[#DDE7E8] hover:border-[#006D77] hover:text-[#122326]'
                }`}
              >
                {pipeline.title}
              </button>
            ))}
          </div>

          {/* Step Play / Pause Controller */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingFlow(!isPlayingFlow)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isPlayingFlow
                  ? 'bg-[#E29578] text-white shadow-sm'
                  : 'bg-white border border-[#DDE7E8] text-[#006D77] hover:bg-[#E0F3F5]'
              }`}
            >
              {isPlayingFlow ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingFlow ? 'Pause Flow' : 'Auto-Step Flow'}</span>
            </button>
            <button
              onClick={() => {
                setActiveStepIdx(0);
                setIsPlayingFlow(false);
              }}
              className="p-1.5 rounded-xl bg-white border border-[#DDE7E8] text-[#4A6367] hover:bg-[#F2F7F8]"
              title="Reset stepper"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active Pipeline Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#DDE7E8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEF4F5] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006D77]">Interactive Flow</span>
              <h3 className="text-2xl font-black text-[#122326] mt-1">{activePipeline.title}</h3>
              <p className="text-xs text-[#4A6367] mt-1">{activePipeline.subtitle}</p>
            </div>
            <div className="text-right text-xs text-[#8BA5A9]">
              Step <span className="font-bold text-[#006D77]">{activeStepIdx + 1}</span> of {activePipeline.steps.length}
            </div>
          </div>

          {/* Stepper Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePipeline.steps.map((step, idx) => {
              const isCurrent = activeStepIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border space-y-3 relative group ${
                    isCurrent
                      ? 'bg-white border-[#006D77] shadow-lg shadow-[#006D77]/15 ring-2 ring-[#006D77]/20 -translate-y-1'
                      : 'bg-[#FAF8F4] border-[#EEF4F5] hover:border-[#B8CCCF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                      isCurrent ? 'bg-[#006D77] text-white shadow-sm' : 'bg-[#E0F3F5] text-[#006D77]'
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className="badge-tag bg-[#E0F3F5] text-[#006D77] text-[10px]">
                      {step.actor}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[#122326]">{step.phase}</h4>
                    <p className="text-xs text-[#4A6367] mt-1 leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-[#DDE7E8] text-[10px] font-mono text-[#006D77] bg-white/60 p-2 rounded-lg">
                    <code>{step.technical}</code>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* ── 2. Interactive Firestore Security Rule Evaluator ── */}
      <section className="bg-gradient-to-br from-[#122326] via-[#162C30] to-[#004E56] text-white rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#E0F3F5] flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">Interactive Firestore Rule Evaluator</h3>
                <span className="badge-tag bg-[#E0F3F5]/20 text-[#E0F3F5] text-[10px] font-bold">LIVE SIMULATOR</span>
              </div>
              <p className="text-xs text-[#B8CCCF]">Test role boundaries and cryptographic rule enforcement in real time.</p>
            </div>
          </div>
        </div>

        {/* Scenario Selection Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#B8CCCF] uppercase tracking-wider block">
            Select Test Access Scenario:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SECURITY_SCENARIOS.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScenarioIdx(idx)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  selectedScenarioIdx === idx
                    ? 'bg-white text-[#122326] border-white shadow-lg shadow-black/20 font-bold'
                    : 'bg-white/5 border-white/10 text-[#E0F3F5] hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">{sc.roleLabel}</span>
                  {sc.allowed ? (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#059669] text-white">200 ALLOW</span>
                  ) : (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#E11D48] text-white">{sc.status} DENY</span>
                  )}
                </div>
                <p className="text-xs font-bold truncate">{sc.actionLabel}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation Output Box */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/15 space-y-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#E29578]" />
              <span className="font-bold text-[#E0F3F5]">Rule Verification Engine</span>
            </div>
            {scenario.allowed ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/30 border border-[#059669] text-[#34D399] font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>ALLOW (HTTP 200 OK)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E11D48]/30 border border-[#E11D48] text-[#F87171] font-bold text-xs">
                <XCircle className="w-4 h-4" />
                <span>BLOCKED (HTTP {scenario.status} {scenario.status === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN'})</span>
              </div>
            )}
          </div>

          <div className="space-y-1 text-[#E0F3F5]">
            <p className="text-[#8BA5A9] text-[11px] font-sans">Enforced Firestore Security Rule:</p>
            <div className="p-3 rounded-xl bg-black/60 text-[#38BDF8] border border-white/10 overflow-x-auto">
              <code>{scenario.rule}</code>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#8BA5A9] text-[11px] font-sans">Architectural Rationale:</p>
            <p className="font-sans text-xs text-[#E0F3F5] leading-relaxed">
              {scenario.reason}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Role-Based Access Control (RBAC) Matrix ── */}
      <section className="bg-white rounded-3xl p-6 lg:p-8 border border-[#DDE7E8] shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#122326]">Role-Based Security Matrix (Firestore Rules)</h3>
            <p className="text-xs text-[#4A6367]">
              Enforced cryptographically at the database tier using Firestore security rules.
            </p>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#DDE7E8] text-[#4A6367] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Shop Owner</th>
                <th className="py-3 px-4">Staff (canEdit: true)</th>
                <th className="py-3 px-4">Staff (View Only)</th>
                <th className="py-3 px-4">Firestore Security Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF4F5]">
              {securityMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F4] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#122326]">{row.resource}</td>
                  <td className="py-3.5 px-4 text-[#059669] font-semibold">{row.owner}</td>
                  <td className="py-3.5 px-4 text-[#006D77] font-semibold">{row.staffEdit}</td>
                  <td className="py-3.5 px-4 text-[#C45C12] font-semibold">{row.staffView}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#5F259F]">
                    <code>{row.ruleEnforced}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 3. Firestore Document Hierarchy ── */}
      <section className="bg-gradient-to-br from-[#122326] to-[#004E56] text-white rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#E0F3F5]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black">Firestore NoSQL Data Hierarchy</h3>
            <p className="text-xs text-[#B8CCCF]">Per-shop isolated subcollections ensure multi-tenant security.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-black/30 font-mono text-xs text-[#E0F3F5] leading-relaxed space-y-2 border border-white/10 overflow-x-auto">
          <p className="text-[#E29578] font-bold">/invites/&#123;code&#125;                     <span className="text-[#8BA5A9] font-normal"># Top-level invite token lookup (used: bool, shopId)</span></p>
          <p className="text-[#E29578] font-bold">/staffIndex/&#123;staffUid&#125;             <span className="text-[#8BA5A9] font-normal"># Reverse lookup: staffUid -&gt; shopId</span></p>
          <p className="text-[#008B96] font-bold">/shops/&#123;shopId&#125;                     <span className="text-[#8BA5A9] font-normal"># Shop root document (ownerUid, profile, name, location)</span></p>
          <p className="pl-6 text-white">├── /customers/&#123;customerId&#125;     <span className="text-[#8BA5A9]"># Customer names, phone numbers, balance</span></p>
          <p className="pl-6 text-white">├── /transactions/&#123;transactionId&#125; <span className="text-[#8BA5A9]"># Ledger items (amount, direction, type: GPay/PhonePe/Cash)</span></p>
          <p className="pl-6 text-white">├── /products/&#123;productId&#125;         <span className="text-[#8BA5A9]"># Inventory items, retail price, stock count</span></p>
          <p className="pl-6 text-white">└── /staff/&#123;staffUid&#125;             <span className="text-[#8BA5A9]"># Staff permissions (canEdit: true/false, name, email)</span></p>
        </div>
      </section>

    </div>
  );
}
