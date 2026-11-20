import React from 'react';
import { X, ShieldCheck, Lock, Smartphone, Database, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#122326]/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#DDE7E8] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF4F5] bg-[#FAF8F4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E0F3F5] text-[#006D77] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="privacy-modal-title" className="font-extrabold text-base text-[#122326]">
                Privacy & Data Governance Policy — Sangam
              </h3>
              <p className="text-xs text-[#4A6367]">
                Last Updated: June 2026 · Built for Google Play Compliance & Retail Merchant Protection
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="w-8 h-8 rounded-full bg-[#EEF4F5] hover:bg-[#DDE7E8] text-[#122326] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Policy Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#4A6367] leading-relaxed">
          
          {/* Executive Commitment Card */}
          <div className="p-4 rounded-2xl bg-[#E0F3F5]/60 border border-[#006D77]/20 flex items-start gap-3 text-[#006D77]">
            <Lock className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[#122326] mb-1">Zero Cloud Leakage Guarantee</h4>
              <p className="text-xs text-[#004E56]">
                By default, all customer accounts, mobile numbers, and ledger transactions remain strictly <strong>on the merchant's physical Android device</strong>. No centralized account is required and data is never sold to advertisers.
              </p>
            </div>
          </div>

          {/* Policy Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Section 1 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#EEF4F5] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#122326]">
                <Database className="w-4 h-4 text-[#006D77]" />
                <h5>1. On-Device Storage & SQLite</h5>
              </div>
              <p>
                Store profiles, customer running balances, and itemized billing carts are persisted into local encrypted SQLite databases. Passwords use salted cryptographic hashes and are never uploaded in plaintext.
              </p>
            </div>

            {/* Section 2 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#EEF4F5] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#122326]">
                <Smartphone className="w-4 h-4 text-[#E29578]" />
                <h5>2. Notification & UPI Interception</h5>
              </div>
              <p>
                Auto-read operates via Android's <code className="bg-white px-1 py-0.5 rounded border">NotificationListenerService</code>. The service only inspects whitelisted packages (PhonePe, GPay, Paytm, BHIM). Personal WhatsApp messages and OTPs are completely ignored.
              </p>
            </div>

            {/* Section 3 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#EEF4F5] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#122326]">
                <UserCheck className="w-4 h-4 text-[#059669]" />
                <h5>3. Role-Based Access Control</h5>
              </div>
              <p>
                Admin (Store Owner) can invite Staff with granular permissions: "Can Edit" or "View Only". Sensitive banking endpoints and net profit reports remain visible exclusively to the Admin.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#EEF4F5] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#122326]">
                <CheckCircle2 className="w-4 h-4 text-[#5F259F]" />
                <h5>4. One-Click Data Erasure</h5>
              </div>
              <p>
                Merchants maintain full sovereignty. You can erase all customer debts, transaction histories, or uninstall the app anytime via <code className="bg-white px-1 py-0.5 rounded border">Settings → Data → Clear all data</code>.
              </p>
            </div>

          </div>

          {/* Google Play Note */}
          <div className="p-4 rounded-2xl bg-[#FFF0EB] border border-[#E29578]/30 flex items-start gap-3 text-xs text-[#122326]">
            <AlertCircle className="w-5 h-5 text-[#E29578] shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-0.5 text-[#9B3522]">Google Play Store Compliance Note:</strong>
              <span>
                Sangam avoids intrusive background SMS permissions by delegating payment push event detection to Android's native Notification Access APIs, safeguarding customer PII against telemetry scraping.
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF8F4] border-t border-[#EEF4F5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[#8BA5A9]">
            Open Source under MIT License · Finternship Submission
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#006D77] text-white font-bold hover:bg-[#004E56] transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}
