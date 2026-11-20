import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, IndianRupee, Sparkles, CheckCircle2 } from 'lucide-react';

const PRESETS = [
  { label: 'Chai / Paan Stall', accounts: 25, udhar: 15000, soundbox: 1 },
  { label: 'Neighborhood Kirana', accounts: 85, udhar: 75000, soundbox: 1 },
  { label: 'Wholesale General Store', accounts: 220, udhar: 220000, soundbox: 2 }
];

export default function RoiCalculator() {
  const [accounts, setAccounts] = useState(85);
  const [monthlyUdhar, setMonthlyUdhar] = useState(75000);
  const [soundboxes, setSoundboxes] = useState(1);

  // Financial calculations
  const annualSoundboxSaved = soundboxes * 125 * 12;
  const annualBadDebtRecovered = Math.round(monthlyUdhar * 12 * 0.045); // 4.5% average forgotten credit recovery lift
  const annualHoursSaved = Math.round(accounts * 2.8); // ~45 mins saved per evening closing tally
  const totalAnnualBenefit = annualSoundboxSaved + annualBadDebtRecovered;

  const applyPreset = (preset) => {
    setAccounts(preset.accounts);
    setMonthlyUdhar(preset.udhar);
    setSoundboxes(preset.soundbox);
  };

  const fmt = (num) => new Intl.NumberFormat('en-IN').format(num);

  return (
    <div className="bg-white rounded-3xl border border-[#DDE7E8] p-6 lg:p-10 shadow-xl shadow-[#006D77]/5 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEF4F5] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F3F5] text-[#006D77] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#E29578]" />
            <span>Interactive Merchant Savings Calculator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#122326] tracking-tight">
            How Much Does Sangam Save Your Shop Annually?
          </h3>
          <p className="text-xs sm:text-sm text-[#4A6367]">
            Calculate the exact cash returned to your pocket by eliminating physical soundbox fees and automated WhatsApp credit collection.
          </p>
        </div>

        {/* Preset Quick Chips */}
        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF8F4] border border-[#DDE7E8] text-[#4A6367] hover:bg-[#E0F3F5] hover:text-[#006D77] hover:border-[#006D77] transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sliders on Left, Benefit Dashboard on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Slider 1: Customer Accounts */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#122326]">Active Customer Accounts (Regular Khata)</span>
              <span className="font-mono font-black text-sm text-[#006D77] bg-[#E0F3F5] px-2 py-0.5 rounded-md">
                {accounts} Accounts
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={accounts}
              onChange={(e) => setAccounts(Number(e.target.value))}
              aria-label="Active Customer Accounts"
              className="w-full accent-[#006D77] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8BA5A9]">
              <span>10 Accounts</span>
              <span>150 Accounts</span>
              <span>300 Accounts</span>
            </div>
          </div>

          {/* Slider 2: Monthly Udhar Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#122326]">Average Monthly Credit Extended (Udhar)</span>
              <span className="font-mono font-black text-sm text-[#E29578] bg-[#FFF0EB] px-2 py-0.5 rounded-md">
                ₹{fmt(monthlyUdhar)} / mo
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="300000"
              step="5000"
              value={monthlyUdhar}
              onChange={(e) => setMonthlyUdhar(Number(e.target.value))}
              aria-label="Average Monthly Credit Extended"
              className="w-full accent-[#E29578] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8BA5A9]">
              <span>₹10,000</span>
              <span>₹1,50,000</span>
              <span>₹3,00,000</span>
            </div>
          </div>

          {/* Slider 3: Soundboxes Replaced */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#122326]">Hardware Soundboxes to Replace (₹125/mo rent)</span>
              <span className="font-mono font-black text-sm text-[#059669] bg-[#E6F4EF] px-2 py-0.5 rounded-md">
                {soundboxes} {soundboxes === 1 ? 'Box' : 'Boxes'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[0, 1, 2].map((num) => (
                <button
                  key={num}
                  onClick={() => setSoundboxes(num)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    soundboxes === num
                      ? 'bg-[#006D77] text-white border-[#006D77] shadow-sm'
                      : 'bg-[#FAF8F4] border-[#DDE7E8] text-[#4A6367] hover:bg-white'
                  }`}
                >
                  {num === 0 ? 'No Soundbox' : `${num} Soundbox`}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Dashboard Results Column */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#122326] via-[#162C30] to-[#004E56] text-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#B8CCCF] uppercase tracking-wider block">
                Total Annual Value Generated
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#E0F3F5] tracking-tight mt-1 flex items-center">
                <span>₹{fmt(totalAnnualBenefit)}</span>
                <span className="text-xs text-[#8BA5A9] font-normal ml-2">/ year returned</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E29578]">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Box 1: Soundbox Rental */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#E29578] font-bold">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>Soundbox Rent Saved</span>
              </div>
              <p className="text-lg font-black text-white">₹{fmt(annualSoundboxSaved)}</p>
              <p className="text-[10px] text-[#B8CCCF]">Zero monthly ₹125 bank rental fees</p>
            </div>

            {/* Box 2: Bad Debt Recovered */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#059669] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Forgotten Dues Recovered</span>
              </div>
              <p className="text-lg font-black text-white">₹{fmt(annualBadDebtRecovered)}</p>
              <p className="text-[10px] text-[#B8CCCF]">Polite WhatsApp links recover debts</p>
            </div>

          </div>

          {/* Time Saved Meter */}
          <div className="p-4 rounded-2xl bg-[#006D77]/40 border border-[#006D77] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  ~{annualHoursSaved} Hours Saved Every Year
                </span>
                <span className="text-[10px] text-[#DDE7E8]">
                  Daily 45-min manual register math eliminated
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#E29578] text-white text-[10px] font-bold font-mono">
              +25 Days
            </span>
          </div>

          {/* Guarantee Note */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-[#B8CCCF]">
            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
            <span>100% Free Forever under MIT License · Zero hidden platform commission</span>
          </div>

        </div>

      </div>

    </div>
  );
}
