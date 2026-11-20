import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Smartphone, ArrowRight, Zap, Bell, UserCheck, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const mockTriggers = [
  {
    app: 'PhonePe',
    pkg: 'com.phonepe.app',
    amount: 350,
    sender: 'Ramesh Kumar',
    color: '#5F259F',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    rawText: 'Payment of Rs.350 received from Ramesh Kumar via PhonePe'
  },
  {
    app: 'Google Pay',
    pkg: 'com.google.android.apps.nbu.paisa.user',
    amount: 1200,
    sender: 'Pooja Sharma',
    color: '#1A73E8',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    rawText: '₹1,200.00 credited to A/C XX4501 from Pooja Sharma via Google Pay'
  },
  {
    app: 'Paytm',
    pkg: 'net.one97.paytm',
    amount: 85,
    sender: 'Walk-in Customer',
    color: '#002970',
    textColor: 'text-indigo-900',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    rawText: 'Paytm: ₹85 received for shop counter'
  },
  {
    app: 'WhatsApp Pay',
    pkg: 'com.whatsapp',
    amount: 500,
    sender: 'Sunita Singh',
    color: '#25D366',
    textColor: 'text-emerald-800',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    rawText: 'WhatsApp payment: ₹500 received from Sunita Singh'
  }
];

export default function KiranaSimulator() {
  const [notification, setNotification] = useState(null);
  const [queue, setQueue] = useState([]);
  const [customerBalance, setCustomerBalance] = useState(1450);
  const [reconciledCount, setReconciledCount] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [soundboxVoice, setSoundboxVoice] = useState(true);
  const [voiceLang, setVoiceLang] = useState('hi'); // 'hi' | 'en'
  const [spokenAnnouncement, setSpokenAnnouncement] = useState('');
  const [logMessages, setLogMessages] = useState([
    '⚡ Kotlin UpiNotificationListenerService initialized.',
    '📡 EventChannel listening on sangam/upi_notifications.'
  ]);

  const addLog = (msg) => {
    setLogMessages((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const speakPayment = (app, amount) => {
    if (!soundboxVoice || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const text = voiceLang === 'hi'
        ? `${app} पर ${amount} रुपये प्राप्त हुए`
        : `Received ${amount} rupees on ${app}`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = voiceLang === 'hi' ? 'hi-IN' : 'en-IN';
      
      window.speechSynthesis.speak(utterance);
      setSpokenAnnouncement(text);
      setTimeout(() => setSpokenAnnouncement(''), 4000);
    } catch {
      // Gracefully silent in environments without audio support
    }
  };

  const testVoice = () => {
    speakPayment('PhonePe', 350);
  };

  const simulatePayment = (trigger) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setNotification(trigger);
    addLog(`[Android] Notification received from ${trigger.pkg}`);
    addLog(`[Kotlin] looksLikeCredit() passed -> Extracted ₹${trigger.amount} from ${trigger.sender}`);

    // Trigger instant counter speech
    speakPayment(trigger.app, trigger.amount);

    setTimeout(() => {
      setQueue((prev) => [
        {
          id: Date.now(),
          ...trigger,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
      addLog(`[Flutter EventChannel] Inbound payment pushed to queue (Size: ${queue.length + 1})`);
      setIsSimulating(false);
    }, 600);
  };

  const reconcilePayment = (payment) => {
    setQueue((prev) => prev.filter((p) => p.id !== payment.id));
    setCustomerBalance((prev) => Math.max(0, prev - payment.amount));
    setReconciledCount((prev) => prev + 1);
    addLog(`✅ Reconciled ₹${payment.amount} against customer ledger!`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const resetSimulation = () => {
    setCustomerBalance(1450);
    setQueue([]);
    setNotification(null);
    setReconciledCount(0);
    setSpokenAnnouncement('');
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setLogMessages([
      '⚡ Kotlin UpiNotificationListenerService initialized.',
      '📡 EventChannel listening on sangam/upi_notifications.'
    ]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#DDE7E8] shadow-lg shadow-[#006D77]/5 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEF4F5] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F3F5] text-[#006D77] text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-[#E29578]" />
            <span>Interactive Kirana Sandbox</span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#122326]">Live UPI Interception & Zero-Hardware Soundbox</h3>
          <p className="text-xs text-[#4A6367]">
            Simulate an incoming QR scan payment and hear the zero-hardware counter voice announce it in real-time.
          </p>
        </div>

        {/* Soundbox Controls & Reset */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          
          {/* Voice Toggle Button */}
          <button
            onClick={() => setSoundboxVoice(!soundboxVoice)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              soundboxVoice
                ? 'bg-[#E0F3F5] text-[#006D77] border-[#006D77]/40'
                : 'bg-[#FAF8F4] text-[#8BA5A9] border-[#DDE7E8]'
            }`}
            title="Toggle Counter Audio Soundbox"
          >
            {soundboxVoice ? <Volume2 className="w-3.5 h-3.5 text-[#006D77]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundboxVoice ? 'Voice ON' : 'Voice OFF'}</span>
          </button>

          {/* Language Switcher */}
          {soundboxVoice && (
            <div className="inline-flex p-0.5 rounded-xl bg-[#EEF4F5] border border-[#DDE7E8] text-[11px] font-bold">
              <button
                onClick={() => setVoiceLang('hi')}
                className={`px-2 py-1 rounded-lg transition-colors ${voiceLang === 'hi' ? 'bg-[#006D77] text-white' : 'text-[#4A6367]'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setVoiceLang('en')}
                className={`px-2 py-1 rounded-lg transition-colors ${voiceLang === 'en' ? 'bg-[#006D77] text-white' : 'text-[#4A6367]'}`}
              >
                English
              </button>
            </div>
          )}

          {/* Test Voice Button */}
          {soundboxVoice && (
            <button
              onClick={testVoice}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-[#DDE7E8] text-[11px] font-bold text-[#006D77] hover:bg-[#E0F3F5] transition-colors"
            >
              <span>Test Audio</span>
            </button>
          )}

          {/* Reset Button */}
          <button
            onClick={resetSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDE7E8] text-xs font-semibold text-[#4A6367] hover:bg-[#F2F7F8]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Spoken Announcement Wave Banner (when speech is active) */}
      {spokenAnnouncement && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#006D77] via-[#004E56] to-[#122326] text-white flex items-center justify-between shadow-xl shadow-[#006D77]/25 animate-fadeIn border border-[#008B96]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E29578] flex items-center justify-center text-white shadow-md shadow-[#E29578]/30">
              <Volume2 className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#E0F3F5] tracking-wider block">
                Counter Soundbox Broadcast (Zero Hardware)
              </span>
              <p className="text-sm font-black text-white tracking-wide">
                "{spokenAnnouncement}"
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Animated Soundwave Visualizer Bars */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/30 border border-white/10">
              <span className="w-1 h-2.5 bg-[#E29578] rounded-full animate-pulse" />
              <span className="w-1 h-5 bg-[#E0F3F5] rounded-full animate-pulse [animation-delay:150ms]" />
              <span className="w-1 h-3.5 bg-[#059669] rounded-full animate-pulse [animation-delay:300ms]" />
              <span className="w-1 h-6 bg-[#E29578] rounded-full animate-pulse [animation-delay:450ms]" />
              <span className="w-1 h-3 bg-[#E0F3F5] rounded-full animate-pulse [animation-delay:200ms]" />
            </div>
            <span className="badge-tag bg-white/20 text-white text-[10px] font-mono hidden sm:inline">
              Phone Speaker ON
            </span>
          </div>
        </div>
      )}

      {/* Simulator 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Col 1: Triggers & Buttons */}
        <div className="lg:col-span-4 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#4A6367]">1. Tap a payment to simulate:</p>
          <div className="space-y-2.5">
            {mockTriggers.map((t, idx) => (
              <button
                key={idx}
                onClick={() => simulatePayment(t)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all hover:scale-[1.02] flex items-center justify-between ${t.bgColor} ${t.borderColor}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className={`font-bold text-xs ${t.textColor}`}>{t.app}</span>
                  </div>
                  <p className="font-extrabold text-lg text-[#122326] mt-0.5">₹{t.amount}</p>
                  <p className="text-[11px] text-[#4A6367]">From: {t.sender}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white/80 border border-white flex items-center justify-center text-[#122326]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Customer Khata Status Card */}
          <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#DDE7E8] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#122326]">Customer: Ramesh Kumar</span>
              <span className="badge-tag bg-[#FFE4E6] text-[#E11D48] text-[10px]">Udhar (Credit)</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#4A6367]">Outstanding Debt:</span>
              <span className="text-xl font-extrabold text-[#E11D48]">₹{customerBalance}</span>
            </div>
            <div className="w-full bg-[#DDE7E8] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#059669] h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (reconciledCount / 3) * 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-[#4A6367] text-right">
              {customerBalance === 0 ? '🎉 All debts settled!' : `₹${customerBalance} remaining to settle`}
            </p>
          </div>
        </div>

        {/* Col 2: Simulated Phone Display & Queue */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#4A6367]">2. Captured UPI Review Queue:</p>
          
          {/* Simulated In-App Toast */}
          {notification && (
            <div className="p-3.5 rounded-2xl bg-[#006D77] text-white shadow-lg shadow-[#006D77]/20 flex items-center justify-between animate-bounce">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#E29578]" />
                <span className="text-xs font-bold">
                  {notification.app}: Received ₹{notification.amount} from {notification.sender}
                </span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">New Alert</span>
            </div>
          )}

          {/* Queue Container */}
          <div className="min-h-[220px] p-4 rounded-2xl bg-[#FAF8F4] border border-[#DDE7E8] space-y-3">
            {queue.length === 0 ? (
              <div className="h-44 flex flex-col items-center justify-center text-center space-y-2 text-[#4A6367]">
                <Smartphone className="w-8 h-8 text-[#8BA5A9]" />
                <p className="text-xs font-medium">No unassigned payments</p>
                <p className="text-[11px] text-[#8BA5A9]">Tap any trigger on the left to simulate an incoming QR scan!</p>
              </div>
            ) : (
              queue.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-white border border-[#DDE7E8] shadow-sm flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-bold text-xs text-[#122326]">{item.app}</span>
                      <span className="text-[10px] text-[#8BA5A9] font-mono">{item.timestamp}</span>
                    </div>
                    <p className="text-sm font-extrabold text-[#122326]">₹{item.amount}</p>
                    <p className="text-[11px] text-[#4A6367]">From: {item.sender}</p>
                  </div>

                  <button
                    onClick={() => reconcilePayment(item)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#059669] text-white text-xs font-bold shadow-md shadow-[#059669]/20 hover:bg-[#047857] transition-all"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Deduct Udhar</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Col 3: Real-Time Kotlin & Engine Telemetry */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#4A6367]">3. Engine Log Stream:</p>
          <div className="h-[310px] p-3 rounded-2xl bg-[#122326] border border-[#2A4448] overflow-y-auto font-mono text-[11px] text-[#E0F3F5] space-y-2">
            {logMessages.map((log, idx) => (
              <div key={idx} className="leading-relaxed border-b border-white/5 pb-1.5 last:border-0">
                {log}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
