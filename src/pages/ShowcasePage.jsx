import React from 'react';
import ThreeCanvas from '../components/ThreeCanvas';
import PhoneMockup from '../components/PhoneMockup';
import RoiCalculator from '../components/RoiCalculator';
import KiranaSimulator from '../components/KiranaSimulator';
import ErrorBoundary from '../components/ErrorBoundary';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Code2,
  ShieldCheck,
  Zap,
  Check,
  Smartphone,
  WifiOff,
  Bot,
  Coins,
  TrendingUp,
  Volume2
} from 'lucide-react';

export default function ShowcasePage({ onExploreCode, onExploreArch, onOpenPrivacy }) {
  const scrollToSimulator = () => {
    const el = document.getElementById('simulator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToScreens = () => {
    const el = document.getElementById('device-screens-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRoi = () => {
    const el = document.getElementById('roi-calculator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* ── 1. Hero Section with 3D Khata ── */}
      <section className="relative pt-6 lg:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F3F5] border border-[#006D77]/20 text-[#006D77] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
                <span>सबका एक हिसाब — Built for 13M Indian Kiranas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#122326] tracking-tight leading-[1.1]">
                Unified Kirana Ledger & <span className="text-[#006D77]">Zero-Hardware Soundbox</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4A6367] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Eliminate ₹125/month soundbox rentals and lost paper registers. Sangam intercepts incoming PhonePe, GPay, and Paytm payments via Android system hooks, automatically matches customer debts, and provides an offline-first ledger.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                
                {/* Launch Simulator Primary */}
                <button
                  onClick={scrollToSimulator}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#006D77] text-white font-bold text-sm shadow-xl shadow-[#006D77]/25 hover:bg-[#004E56] hover:scale-105 transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#E29578] transition-colors">
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span>Launch Kirana Simulator</span>
                </button>

                {/* Explore Real Screens */}
                <button
                  onClick={scrollToScreens}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#E0F3F5] text-[#006D77] font-bold text-sm border border-[#006D77]/30 hover:bg-[#c9edf0] transition-all"
                >
                  <Smartphone className="w-4 h-4 text-[#E29578]" />
                  <span>Real App Screenshots</span>
                </button>

                {/* Learn Code */}
                <button
                  onClick={onExploreCode}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white text-[#122326] font-bold text-sm border border-[#DDE7E8] hover:bg-[#F2F7F8] hover:border-[#006D77] transition-all"
                >
                  <Code2 className="w-4 h-4 text-[#006D77]" />
                  <span>Flutter Code</span>
                  <ArrowRight className="w-4 h-4 text-[#4A6367]" />
                </button>

                {/* Architecture Guide */}
                <button
                  onClick={onExploreArch}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white text-[#122326] font-bold text-sm border border-[#DDE7E8] hover:bg-[#F2F7F8] hover:border-[#006D77] transition-all"
                >
                  <Layers className="w-4 h-4 text-[#006D77]" />
                  <span>Architecture</span>
                </button>

              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-[#4A6367]">
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E0F3F5]/60 text-[#006D77] font-semibold border border-[#006D77]/20 hover:bg-[#E0F3F5] transition-all cursor-pointer shadow-xs"
                  title="Click to view Sangam Zero-Cloud Privacy & Security Policy"
                >
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span>Customer Phone Numbers Masked (Privacy Policy)</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>No SMS Permission Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <WifiOff className="w-4 h-4 text-[#059669]" />
                  <span>100% Offline SQLite</span>
                </div>
              </div>

            </div>

            {/* Right: 3D Interactive Three.js Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[540px] rounded-3xl bg-gradient-to-b from-white/80 via-white/50 to-transparent p-2 border border-white/60 shadow-xl shadow-[#006D77]/10 relative">
                <ErrorBoundary fallbackMessage="WebGL hardware rendering is unavailable on this device. Displaying static Khata view.">
                  <ThreeCanvas />
                </ErrorBoundary>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. Metric Highlights Bar ── */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-[#DDE7E8] space-y-1 shadow-sm hover:border-[#006D77] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#006D77]">₹0 / mo</span>
              <Coins className="w-5 h-5 text-[#006D77]/40" />
            </div>
            <h4 className="text-xs font-bold text-[#122326]">Zero Hardware Costs</h4>
            <p className="text-[11px] text-[#4A6367]">Replaces expensive ₹125/mo rental soundboxes with native Android audio hooks.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDE7E8] space-y-1 shadow-sm hover:border-[#E29578] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#E29578]">&lt; 40ms</span>
              <Zap className="w-5 h-5 text-[#E29578]/40" />
            </div>
            <h4 className="text-xs font-bold text-[#122326]">Instant Payment Capture</h4>
            <p className="text-[11px] text-[#4A6367]">NotificationListenerService intercepts UPI transaction strings with zero lag.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDE7E8] space-y-1 shadow-sm hover:border-[#059669] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#059669]">100%</span>
              <ShieldCheck className="w-5 h-5 text-[#059669]/40" />
            </div>
            <h4 className="text-xs font-bold text-[#122326]">Play Store Compliant</h4>
            <p className="text-[11px] text-[#4A6367]">Never requests dangerous READ_SMS permissions; passes strict Google privacy audits.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDE7E8] space-y-1 shadow-sm hover:border-[#5F259F] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#5F259F]">Llama 3.3</span>
              <Bot className="w-5 h-5 text-[#5F259F]/40" />
            </div>
            <h4 className="text-xs font-bold text-[#122326]">Groq Edge AI Fallback</h4>
            <p className="text-[11px] text-[#4A6367]">70B open-weights model parses non-standard bank SMS formats in sub-second JSON.</p>
          </div>

        </div>
      </section>

      {/* ── 3. Product Feature Matrix: What Makes Sangam Special ── */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F3F5] text-[#006D77] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
            <span>Engineered for Retail Velocity</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#122326] tracking-tight">
            Six Pillars That Transform Indian Kirana Bookkeeping
          </h2>
          <p className="text-sm sm:text-base text-[#4A6367]">
            Every single feature was designed by listening to merchants in Delhi, Jaipur, and Patna who were tired of battery-draining soundboxes and awkward debt collection conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Zero-Hardware Soundbox */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDE7E8] shadow-sm hover:shadow-xl hover:border-[#006D77] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F3F5] text-[#006D77] flex items-center justify-center font-black">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#122326]">Zero-Hardware Soundbox</h3>
            <p className="text-xs text-[#4A6367] leading-relaxed">
              Traditional hardware soundboxes require monthly rentals and dedicated power outlets. Sangam listens to OS notifications and speaks the received amount out loud through the merchant's phone speaker.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#006D77] flex items-center gap-1.5 font-bold">
              <span>🔊 "PhonePe पर ₹100 प्राप्त हुए"</span>
            </div>
          </div>

          {/* Card 2: 1-Tap Udhar Reconciliation */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDE7E8] shadow-sm hover:shadow-xl hover:border-[#E29578] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#E29578] flex items-center justify-center font-black">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#122326]">Instant Udhar Deduction</h3>
            <p className="text-xs text-[#4A6367] leading-relaxed">
              When regular customers like Mohan Sharma pay via UPI, Sangam matches the incoming payment to their open credit ledger. Tap "Deduct Udhar" and their balance clears instantly with visual confetti.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#E29578] flex items-center gap-1.5 font-bold">
              <span>⚡ Deducts debt in &lt; 2 seconds</span>
            </div>
          </div>

          {/* Card 3: 100% Offline SQLite */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDE7E8] shadow-sm hover:shadow-xl hover:border-[#059669] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F4EF] text-[#059669] flex items-center justify-center font-black">
              <WifiOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#122326]">100% Offline Resilience</h3>
            <p className="text-xs text-[#4A6367] leading-relaxed">
              Basement kirana shops lose cellular connectivity often. Sangam executes all calculations and stores transactions in an embedded SQLite database, seamlessly syncing to Firestore when internet resumes.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#059669] flex items-center gap-1.5 font-bold">
              <span>🛡️ Zero data loss during outages</span>
            </div>
          </div>

          {/* Card 4: 1-Tap WhatsApp Recovery */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDE7E8] shadow-sm hover:shadow-xl hover:border-[#5F259F] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0EAF9] text-[#5F259F] flex items-center justify-center font-black">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#122326]">Polite WhatsApp Reminders</h3>
            <p className="text-xs text-[#4A6367] leading-relaxed">
              Generates bilingual polite payment requests with exact rupee amounts and the shop's direct UPI payment link. Eliminates awkward verbal confrontations and recovers dues 3x faster.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#5F259F] flex items-center gap-1.5 font-bold">
              <span>📱 Pre-filled UPI intent links</span>
            </div>
          </div>

          {/* Card 5: Strict PII Privacy */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDE7E8] shadow-sm hover:shadow-xl hover:border-[#006D77] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F3F5] text-[#006D77] flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#122326]">Merchant & Customer Privacy</h3>
            <p className="text-xs text-[#4A6367] leading-relaxed">
              Phone numbers, personal contacts, and transaction histories stay on the merchant's device and encrypted Firestore tenant. Customer phone numbers are masked on public displays for airtight security.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#006D77] flex items-center gap-1.5 font-bold">
              <span>🔒 Zero data sharing with ad brokers</span>
            </div>
          </div>

          {/* Card 6: Multi-Staff Access Control */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDE7E8] shadow-sm hover:shadow-xl hover:border-[#E29578] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#E29578] flex items-center justify-center font-black">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#122326]">Multi-Device Team Sync</h3>
            <p className="text-xs text-[#4A6367] leading-relaxed">
              Store owners can generate single-use atomic invite tokens to grant shop assistants access to record sales and bills without exposing private bank settlement accounts or net profit reports.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#E29578] flex items-center gap-1.5 font-bold">
              <span>👥 Owner vs Staff permission roles</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Interactive Phone Mockup with Real App Screenshots ── */}
      <section id="device-screens-section" className="max-w-7xl mx-auto px-4 lg:px-8">
        <PhoneMockup />
      </section>

      {/* ── 5. Competitive Comparison Table ── */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="badge-tag bg-[#E0F3F5] text-[#006D77] text-xs">
            Market Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122326] tracking-tight">
            How Sangam Compares to Legacy Solutions
          </h2>
          <p className="text-xs sm:text-sm text-[#4A6367]">
            Why 13 million Indian kirana owners are switching away from paper registers and proprietary rental soundboxes.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#DDE7E8] shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF8F4] border-b border-[#DDE7E8] text-[#122326]">
                <th className="p-4 font-bold">Capability / Feature</th>
                <th className="p-4 font-bold text-[#8A8A85]">Paper Bahi-Khata</th>
                <th className="p-4 font-bold text-[#8A8A85]">Khatabook / OkCredit</th>
                <th className="p-4 font-bold text-[#006D77] bg-[#E0F3F5]/50">Sangam (सबका एक हिसाब)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF4F5]">
              
              <tr>
                <td className="p-4 font-bold text-[#122326]">Hardware Rental Cost</td>
                <td className="p-4 text-[#4A6367]">₹0 (Paper notebook)</td>
                <td className="p-4 text-[#9B3522] font-medium">₹125/mo for soundbox</td>
                <td className="p-4 font-bold text-[#059669] bg-[#E0F3F5]/20 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>₹0 Forever (Zero Hardware)</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-[#122326]">UPI Payment Capture</td>
                <td className="p-4 text-[#4A6367]">100% Manual entry</td>
                <td className="p-4 text-[#4A6367]">Manual typing / QR scan</td>
                <td className="p-4 font-bold text-[#059669] bg-[#E0F3F5]/20 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>Zero-Tap Auto Notification Hook</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-[#122326]">Play Store Privacy Audit</td>
                <td className="p-4 text-[#4A6367]">N/A (Offline paper)</td>
                <td className="p-4 text-[#4A6367]">Requires SMS permissions</td>
                <td className="p-4 font-bold text-[#059669] bg-[#E0F3F5]/20 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>No SMS Permission Needed</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-[#122326]">Offline Capability</td>
                <td className="p-4 text-[#4A6367]">100% Offline</td>
                <td className="p-4 text-[#9B3522] font-medium">Fails without active 4G</td>
                <td className="p-4 font-bold text-[#059669] bg-[#E0F3F5]/20 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>SQLite Offline First + Cloud Sync</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-[#122326]">Ambiguous Alert Parsing</td>
                <td className="p-4 text-[#4A6367]">Manual human reading</td>
                <td className="p-4 text-[#8A8A85]">Ignored or dropped</td>
                <td className="p-4 font-bold text-[#059669] bg-[#E0F3F5]/20 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>Groq Llama 3.3 70B AI Fallback</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-[#122326]">WhatsApp Payment Recovery</td>
                <td className="p-4 text-[#4A6367]">Manual phone calls</td>
                <td className="p-4 text-[#4A6367]">Basic generic SMS</td>
                <td className="p-4 font-bold text-[#059669] bg-[#E0F3F5]/20 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669]" />
                  <span>1-Tap Bilingual WhatsApp + UPI QR</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* ── 6. Kirana ROI & Annual Hardware Savings Calculator ── */}
      <section id="roi-calculator-section" className="max-w-7xl mx-auto px-4 lg:px-8">
        <RoiCalculator />
      </section>

      {/* ── 7. Live Interactive Kirana Simulator ── */}
      <section id="simulator-section" className="max-w-7xl mx-auto px-4 lg:px-8">
        <KiranaSimulator />
      </section>

      {/* ── 8. Full Tech Stack Summary ── */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-br from-[#122326] via-[#1A2B2E] to-[#004E56] text-white rounded-3xl p-8 lg:p-12 space-y-8 shadow-2xl">
          
          <div className="max-w-2xl space-y-2">
            <span className="badge-tag bg-[#E0F3F5]/20 text-[#E0F3F5] text-xs font-bold">
              Architectural Rigor
            </span>
            <h3 className="text-3xl font-black tracking-tight">The Modern Production Stack</h3>
            <p className="text-sm text-[#B8CCCF]">
              Sangam uses high-performance native Flutter compilation, reactive Riverpod state streams, and cloud synchronization designed specifically for India's retail economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#008B96] flex items-center justify-center text-white font-bold text-xs">
                FL
              </div>
              <h4 className="font-bold text-sm">Flutter & Dart 3.3</h4>
              <p className="text-xs text-[#B8CCCF]">60-120 FPS native ARM compilation with Material 3 Poppins theme.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#006D77] flex items-center justify-center text-white font-bold text-xs">
                RP
              </div>
              <h4 className="font-bold text-sm">Riverpod 2.5</h4>
              <p className="text-xs text-[#B8CCCF]">Compile-safe reactive state notifiers with automatic memory disposal.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E29578] flex items-center justify-center text-white font-bold text-xs">
                KT
              </div>
              <h4 className="font-bold text-sm">Android Kotlin Service</h4>
              <p className="text-xs text-[#B8CCCF]">NotificationListenerService & EventChannel for real-time UPI capture.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#5F259F] flex items-center justify-center text-white font-bold text-xs">
                GQ
              </div>
              <h4 className="font-bold text-sm">Groq Llama 3.3 70B</h4>
              <p className="text-xs text-[#B8CCCF]">Sub-second LLM inference fallback for unstructured banking SMS alerts.</p>
            </div>

          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#8BA5A9]">
              Source Code available under MIT License · OkCredit Finternship Submission
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onExploreCode}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-[#122326] font-bold text-xs hover:bg-[#E0F3F5] transition-colors"
              >
                <span>Explore All Code Files</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Floating Quick Nav Pill ── */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[#122326]/90 backdrop-blur-md border border-white/20 shadow-2xl text-white text-xs font-bold">
        <button
          onClick={scrollToScreens}
          className="px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1 cursor-pointer"
          title="Jump to Device Screens"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#E0F3F5]" />
          <span className="hidden sm:inline">Screens</span>
        </button>
        <button
          onClick={scrollToRoi}
          className="px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1 cursor-pointer"
          title="Jump to ROI Calculator"
        >
          <Coins className="w-3.5 h-3.5 text-[#E29578]" />
          <span className="hidden sm:inline">Savings</span>
        </button>
        <button
          onClick={scrollToSimulator}
          className="px-3 py-1.5 rounded-full bg-[#006D77] hover:bg-[#008B96] transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
          title="Jump to Live Simulator"
        >
          <Zap className="w-3.5 h-3.5 text-[#E29578]" />
          <span>Sandbox</span>
        </button>
        <button
          onClick={scrollToTop}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ml-0.5 cursor-pointer font-black"
          title="Back to top"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>

    </div>
  );
}
