import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn
} from 'lucide-react';

const REAL_APP_SCREENS = [
  {
    id: 'collection-hub',
    title: "Today's Collection & Net Balance",
    subtitle: 'Live counter balance with auto-reconciled UPI payments',
    image: '/media/screen_collection_today.jpg',
    badge: 'Zero-Hardware Soundbox',
    metrics: { primary: '₹1,970', label: 'Collected Today', subtitle: 'Credit Out: ₹0' },
    details: [
      'Captures PhonePe, GPay, Paytm alerts without ₹125/mo soundbox rentals',
      'Real-time Net Balance counter with live customer vs supplier categorization',
      'Instant voice confirmation in merchant’s regional tongue'
    ],
    kiranaInsight: 'Merchants avoid holding up lines to ask "Aaya kya?" (Did it come?) — the counter phone announces the payment instantly.'
  },
  {
    id: 'ledger-main',
    title: 'Customer Ledger & Udhar Tracking',
    subtitle: '7 active customer accounts with masked phone numbers & color-coded dues',
    image: '/media/screen_ledger_main.jpg',
    badge: 'Privacy Protected',
    metrics: { primary: '7 Accounts', label: 'Active Kirana Khata', subtitle: 'Net: ₹1,970' },
    details: [
      'Customer phone numbers automatically blurred for complete PII safety',
      'Color-coded Advance (Green) vs Udhar (Warm Saffron/Red) tags',
      'Quick "+ Add Customer" FAB optimized for single-hand phone usage'
    ],
    kiranaInsight: 'No more lost paper bahi-khata notebooks or torn pages. Every regular customer’s running balance is clear in 1 tap.'
  },
  {
    id: 'mohan-dues',
    title: 'Mohan Sharma Dues & 1-Tap Reminders',
    subtitle: 'Granular dues clearance history with direct Call & WhatsApp action buttons',
    image: '/media/screen_mohan_dues.jpg',
    badge: '1-Tap Recovery',
    metrics: { primary: '₹0 Due', label: 'Mohan Sharma Settled', subtitle: '3 Partial Dues Cleared' },
    details: [
      '1-Tap WhatsApp reminder automatically generates payment link with exact amount',
      'Dedicated "Call" and "Remind" buttons save counter time during morning rush',
      'Instant "Received" and "Given" buttons to record spot cash transactions'
    ],
    kiranaInsight: 'Eliminates awkward payment confrontations: WhatsApp reminders are polite, clear, and include a direct UPI payment link.'
  },
  {
    id: 'mohan-history',
    title: 'Timestamped Audit Trail & Clearance',
    subtitle: 'Immutable date-wise breakdown of partial payments with minute-level precision',
    image: '/media/screen_mohan_history.jpg',
    badge: 'Audit Trail',
    metrics: { primary: '₹340 / ₹240', label: 'Partial Clearances', subtitle: 'Verified with checkmarks' },
    details: [
      'Every transaction logged with exact date and time (e.g. 08:32 PM, 06:06 PM)',
      'Checkmark indicators confirm successful reconciliation with shop bank ledger',
      'Offline queue persists logs locally if store Wi-Fi or cellular drops'
    ],
    kiranaInsight: 'When a customer claims "Maine kal sham ko de diya tha" (I paid yesterday evening), the merchant can show the exact timestamped entry in 2 seconds.'
  },
  {
    id: 'customer-directory',
    title: 'Fast Customer Directory & Settled Accounts',
    subtitle: 'Searchable database of regular shoppers with real-time settlement status',
    image: '/media/screen_customer_directory.jpg',
    badge: 'Directory',
    metrics: { primary: 'All Settled', label: 'Customer Directory', subtitle: 'Instant Search' },
    details: [
      'Instant search bar to find customers by first name or nickname',
      'Clear green "Settled" status tags eliminate manual math at closing time',
      'Multi-staff device sync ensures cashier and owner see matching accounts'
    ],
    kiranaInsight: 'End-of-day tallying drops from 45 minutes of calculator math to 0 seconds.'
  }
];

const ONBOARDING_SCREENS = [
  {
    id: 'bill-add',
    title: 'Fast Itemized Billing',
    subtitle: 'Add products with custom pricing and quantities in seconds',
    image: '/images/bill_add_onboarding.png',
    badge: 'POS Speed',
    metrics: { primary: '< 5 Sec', label: 'Per Customer Bill', subtitle: 'Touch-optimized' },
    details: [
      'Quick quantity increments for busy rush hours',
      'Instant unit price override for regular customers',
      'Offline cart calculation with zero latency'
    ],
    kiranaInsight: 'Built to match the speed of a experienced kirana owner grabbing items off the shelf.'
  },
  {
    id: 'bill-charges',
    title: 'Discounts & Delivery Charges',
    subtitle: 'Transparent additions for home delivery and promotional discounts',
    image: '/images/bill_charges_onboarding.png',
    badge: 'Flexibility',
    metrics: { primary: 'Custom ₹ / %', label: 'Flexible Discounts', subtitle: 'Delivery toggle' },
    details: [
      'Custom delivery fee toggle for neighborhood apartment delivery',
      'Percentage or fixed ₹ discount calculation',
      'Automatic bill total recalculation'
    ],
    kiranaInsight: 'Helps local kiranas compete with quick-commerce apps by offering free or nominal delivery charges.'
  },
  {
    id: 'bill-select',
    title: 'Product Catalog & Quick Select',
    subtitle: 'Pre-loaded Kirana items (Atta, Dal, Oil, Spices) ready to tap',
    image: '/images/bill_select_onboarding.png',
    badge: 'One-Tap Catalog',
    metrics: { primary: '500+ Items', label: 'Preloaded FMCG', subtitle: 'Bilingual Search' },
    details: [
      'Search catalog by Hindi or English phonetic name',
      'Stock level indicators to prevent overselling',
      'Category filtering for FMCG, Grains, and Dairy'
    ],
    kiranaInsight: 'Owners do not need barcodes — high-resolution pictures and phonetic search make item entry instant.'
  },
  {
    id: 'stock-tracking',
    title: 'Real-Time Inventory Sync',
    subtitle: 'Stock counts deduct automatically as bills are generated',
    image: '/images/stock_onboarding.png',
    badge: 'Inventory',
    metrics: { primary: 'Real-Time', label: 'Auto-Deduction', subtitle: 'Low-stock warnings' },
    details: [
      'Low-stock threshold alerts for wholesale restock ordering',
      'Wholesale purchase price vs retail profit margin tracking',
      'Multi-device real-time sync with shop assistants'
    ],
    kiranaInsight: 'Prevents empty shelf surprises before evening peak hours.'
  }
];

export default function PhoneMockup() {
  const [activeTab, setActiveTab] = useState('real'); // 'real' | 'onboarding'
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const screens = activeTab === 'real' ? REAL_APP_SCREENS : ONBOARDING_SCREENS;
  const active = screens[selectedIdx] || screens[0];

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSelectedIdx(0);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-8">
      
      {/* Category Toggle Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#DDE7E8]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F3F5] text-[#006D77] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
            <span>Interactive Device Showcase</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#122326] tracking-tight">
            Explore the Real Sangam App in Action
          </h3>
        </div>

        {/* View Switcher Pill */}
        <div className="inline-flex p-1 rounded-2xl bg-[#EEF4F5] border border-[#DDE7E8] self-start sm:self-auto">
          <button
            onClick={() => handleTabSwitch('real')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'real'
                ? 'bg-[#006D77] text-white shadow-sm'
                : 'text-[#4A6367] hover:text-[#122326]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Live Device Screenshots</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#E29578] text-white text-[9px] font-mono">
              REAL
            </span>
          </button>
          
          <button
            onClick={() => handleTabSwitch('onboarding')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'onboarding'
                ? 'bg-[#006D77] text-white shadow-sm'
                : 'text-[#4A6367] hover:text-[#122326]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>POS & Billing Flow</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Feature Selector + Phone Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Interactive Feature Selector */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Privacy Notice Banner if viewing real screens */}
          {activeTab === 'real' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#E0F3F5]/60 border border-[#006D77]/20 text-xs text-[#006D77]">
              <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
              <span>
                <strong>Confidential Merchant Data Protected:</strong> All customer mobile numbers and PII on these live screenshots are masked with Gaussian blur privacy badges.
              </span>
            </div>
          )}

          {/* Feature List Cards */}
          <div className="space-y-3">
            {screens.map((screen, idx) => (
              <div
                key={screen.id}
                onClick={() => setSelectedIdx(idx)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedIdx === idx
                    ? 'bg-white border-[#006D77] shadow-lg shadow-[#006D77]/10 translate-x-1.5'
                    : 'bg-[#FAF8F4] border-[#DDE7E8] hover:bg-white hover:border-[#B8CCCF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      selectedIdx === idx ? 'bg-[#006D77] text-white' : 'bg-[#E0F3F5] text-[#006D77]'
                    }`}>
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#122326]">{screen.title}</h4>
                      <p className="text-xs text-[#4A6367] line-clamp-1">{screen.subtitle}</p>
                    </div>
                  </div>
                  <span className="badge-tag bg-[#E0F3F5] text-[#006D77] text-[10px] shrink-0 ml-2">
                    {screen.badge}
                  </span>
                </div>

                {/* Expanded Details when selected */}
                {selectedIdx === idx && (
                  <div className="mt-3 pt-3 border-t border-[#EEF4F5] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {screen.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-[#4A6367]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Merchant Quote / Story */}
                    <div className="p-2.5 rounded-xl bg-[#F2F7F8] border border-[#DDE7E8] text-[11px] text-[#004E56] italic">
                      "{screen.kiranaInsight}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Right: Modern Smartphone Frame */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div className="relative group">
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg border border-[#DDE7E8] text-[#122326] flex items-center justify-center hover:bg-[#E0F3F5] hover:text-[#006D77] transition-all cursor-pointer"
              title="Previous screen"
              aria-label="Previous screen"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg border border-[#DDE7E8] text-[#122326] flex items-center justify-center hover:bg-[#E0F3F5] hover:text-[#006D77] transition-all cursor-pointer"
              title="Next screen"
              aria-label="Next screen"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Smartphone Case */}
            <div className="relative w-[280px] sm:w-[320px] rounded-[46px] bg-[#122326] p-3.5 shadow-2xl shadow-[#006D77]/25 border-4 border-[#2A4448]">
              
              {/* Speaker / Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#122326] rounded-full z-20 flex items-center justify-center">
                <div className="w-12 h-1.5 bg-[#2A4448] rounded-full" />
              </div>

              {/* Screen Content */}
              <div 
                onClick={() => setIsZoomOpen(true)}
                className="relative w-full aspect-[9/19] rounded-[36px] overflow-hidden bg-white shadow-inner cursor-zoom-in group/screen"
                title="Click to zoom screen"
              >
                <img
                  src={active.image}
                  alt={active.title}
                  width="320"
                  height="675"
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-300 group-hover/screen:scale-105"
                />

                {/* Privacy badge watermark on phone */}
                {activeTab === 'real' && (
                  <div className="absolute top-8 right-3 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#059669]" />
                    <span>PII Masked</span>
                  </div>
                )}

                {/* Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#122326] text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                    <ZoomIn className="w-3.5 h-3.5 text-[#006D77]" />
                    <span>Click to Inspect</span>
                  </div>
                </div>
              </div>

              {/* Phone Reflection Overlay */}
              <div className="absolute inset-3.5 rounded-[36px] pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
            </div>
          </div>

          {/* Quick Caption & Pagination Dots Under Mockup */}
          <div className="mt-4 text-center space-y-2">
            <div>
              <span className="text-xs font-bold text-[#122326]">
                {active.title}
              </span>
              <p className="text-[11px] text-[#4A6367]">
                {active.metrics.label}: <span className="font-bold text-[#006D77]">{active.metrics.primary}</span>
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {screens.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setSelectedIdx(dotIdx)}
                  aria-label={`Go to screen ${dotIdx + 1}`}
                  className={`transition-all rounded-full ${
                    selectedIdx === dotIdx
                      ? 'w-6 h-2 bg-[#006D77]'
                      : 'w-2 h-2 bg-[#DDE7E8] hover:bg-[#B8CCCF]'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ── Zoom Lightbox Modal ── */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#122326]/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#DDE7E8] flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Image Viewer with Full Ratio */}
            <div className="md:w-1/2 bg-[#0D191B] p-6 flex items-center justify-center relative min-h-[380px]">
              <div className="w-56 aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Prev / Next inside modal */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white hover:text-[#122326] flex items-center justify-center transition-colors"
                aria-label="Previous screen"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white hover:text-[#122326] flex items-center justify-center transition-colors"
                aria-label="Next screen"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Screen Details & Kirana Rationale */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#EEF4F5]">
                  <span className="badge-tag bg-[#E0F3F5] text-[#006D77] text-xs font-bold">
                    {active.badge}
                  </span>
                  <button
                    onClick={() => setIsZoomOpen(false)}
                    aria-label="Close image inspector"
                    className="w-8 h-8 rounded-full bg-[#EEF4F5] hover:bg-[#DDE7E8] text-[#122326] flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="text-2xl font-black text-[#122326]">{active.title}</h3>
                  <p className="text-xs text-[#4A6367]">{active.subtitle}</p>
                </div>

                {/* Key Metric Spotlight */}
                <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F4] border border-[#EEF4F5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8BA5A9] tracking-wider block">
                      {active.metrics.label}
                    </span>
                    <span className="text-xl font-black text-[#006D77]">
                      {active.metrics.primary}
                    </span>
                  </div>
                  <span className="text-xs text-[#4A6367] font-medium bg-white px-2.5 py-1 rounded-lg border border-[#DDE7E8]">
                    {active.metrics.subtitle}
                  </span>
                </div>

                {/* Detail Points */}
                <div className="mt-4 space-y-2">
                  <span className="text-xs font-bold text-[#122326] block">Key Functional Highlights:</span>
                  {active.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#4A6367]">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Kirana Scenario */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#FFF0EB] border border-[#E29578]/30 text-xs text-[#9B3522] italic">
                  <strong>Merchant Reality:</strong> "{active.kiranaInsight}"
                </div>
              </div>

              <div className="pt-4 border-t border-[#EEF4F5] flex items-center justify-between text-xs text-[#8BA5A9]">
                <span>Screen {selectedIdx + 1} of {screens.length}</span>
                <span className="font-semibold text-[#006D77]">Esc or click outside to close</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
