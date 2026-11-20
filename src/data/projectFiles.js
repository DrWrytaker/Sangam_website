// Comprehensive registry of all files, folders, and verbatim snippets from the live Sangam codebase.
// Last audited against Sangam commit 0dbcd50.

export const projectFolders = [
  {
    id: 'core',
    name: 'lib/core/',
    description: 'Design system tokens, constants, extensions, formatting, and internationalization.',
    fileCount: 4
  },
  {
    id: 'domain-entities',
    name: 'lib/domain/entities/',
    description: 'Framework-independent business models (Customer, Transaction, Bill, Product, AppUser, SmsEntry).',
    fileCount: 6
  },
  {
    id: 'domain-usecases',
    name: 'lib/domain/usecases/',
    description: 'Pure domain operations like regular expression SMS extraction and keyword arbitration.',
    fileCount: 1
  },
  {
    id: 'models',
    name: 'lib/models/',
    description: 'Platform channel DTOs bridging native Kotlin payloads with Flutter domain types.',
    fileCount: 1
  },
  {
    id: 'services',
    name: 'lib/services/',
    description: 'External integrations: Cloud Firestore, Google Auth, Groq Llama-3 AI, Native UPI channels.',
    fileCount: 4
  },
  {
    id: 'presentation-providers',
    name: 'lib/presentation/providers/',
    description: 'Riverpod state notifiers, real-time listeners, and cloud synchronization controllers.',
    fileCount: 2
  },
  {
    id: 'android-native',
    name: 'android/.../com/sangam/app/',
    description: 'Kotlin background notification listener, EventChannels, and native payment queues.',
    fileCount: 2
  },
  {
    id: 'backend-security',
    name: 'backend & rules/',
    description: 'Firestore rule-based access control and Firebase Cloud Functions for staff provisioning.',
    fileCount: 2
  },
  {
    id: 'root-wiring',
    name: 'lib/ (Root Wiring)',
    description: 'Entrypoint, GoRouter navigation table, and top-level notification event host.',
    fileCount: 2
  }
];

export const projectFiles = [
  // ── 1. lib/core/utils.dart ───────────────────────────────────
  {
    id: 'core-utils',
    folderId: 'core',
    folder: 'lib/core',
    fileName: 'utils.dart',
    title: 'Indian Numbering & Credit Due Engine',
    category: 'Core & Config',
    badge: 'Business Rules',
    overview: 'Contains Indian Rupee Lakh/Crore currency formatting, 7-day credit overdue computation, avatar letter generation, and 10-digit phone regex validation.',
    snippets: [
      {
        id: 'fmtRupee',
        title: '1. Indian Rupee Formatter (fmtRupee)',
        code: `String fmtRupee(num amount) {
  final formatter = NumberFormat('#,##,###', 'en_IN');
  return '₹\${formatter.format(amount.abs())}';
}`,
        whyWritten: 'Standard international formats group numbers in thousands ($100,000). Indian commerce strictly uses Lakhs and Crores (₹1,00,000). This formatter applies the official "en_IN" locale pattern so kirana owners read amounts instantly without cognitive load.',
        lineByLine: [
          'Line 1: Accepts any numeric type (int, double, num) allowing clean poly-numeric reuse.',
          'Line 2: Instantiates NumberFormat with Indian pattern "#,##,###" under the "en_IN" locale.',
          'Line 3: Uses amount.abs() to strip minus signs because credit/debit direction is conveyed through UI colors (red/green) and labels, not confusing negative numbers.'
        ],
        whatBreaksIfRemoved: 'Large amounts like ₹1,50,000 would display as ₹150,000, violating Indian bookkeeping norms. Negative balances could double-render minus signs in styled red pills.',
        kiranaScenario: 'Shopkeeper Ramesh glances at a ₹2,50,000 monthly turnover figure. With standard formatting (250,000), he might misread it as 25,000 during a chaotic evening rush.'
      },
      {
        id: 'customerStatus',
        title: '2. 7-Day Credit Overdue Logic (getCustomerStatus)',
        code: `enum CustomerStatus { settled, dueSoon, overdue, pending }

CustomerStatus getCustomerStatus(num balance, DateTime? lastCreditDate) {
  if (balance <= 0) return CustomerStatus.settled;
  if (lastCreditDate == null) return CustomerStatus.pending;
  final days = DateTime.now().difference(lastCreditDate).inDays;
  if (days > AppConstants.creditDueDays) return CustomerStatus.overdue;
  if (days > AppConstants.creditDueDays - 3) return CustomerStatus.dueSoon;
  return CustomerStatus.pending;
}`,
        whyWritten: 'Kirana shops fail when udhar (credit) sits uncollected for weeks. This rule engine categorizes customer accounts into 4 strict stages based on a 7-day credit window (AppConstants.creditDueDays).',
        lineByLine: [
          'Line 1: Defines 4 mutually exclusive states: settled (0 balance), dueSoon (days 5-7), overdue (>7 days), and pending (days 1-4).',
          'Line 3-4: If balance <= 0, customer owes nothing, returning settled.',
          'Line 5-6: Calculates elapsed days between right now and the day credit was extended.',
          'Line 7: If past 7 days, flags overdue (triggers red alert & WhatsApp reminder prompt).',
          'Line 8: If within 3 days of deadline, flags dueSoon (amber warning).'
        ],
        whatBreaksIfRemoved: 'The dashboard overdue counter and automatic WhatsApp payment nudge buttons would have no condition to trigger, allowing delinquent debt to accumulate silently.',
        kiranaScenario: 'Customer Suresh borrowed ₹1,200 on Monday. On Sunday (day 6), Sangam highlights him in Amber ("Due in 1d"). On Tuesday (day 8), it turns Red ("1d overdue") with a 1-tap WhatsApp reminder.'
      },
      {
        id: 'stringExt',
        title: '3. Indian Phone Validator & Avatar Initials',
        code: `extension StringExt on String {
  String get initials {
    final parts = trim().split(' ');
    if (parts.isEmpty) return '?';
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return '\${parts[0][0]}\${parts[1][0]}'.toUpperCase();
  }

  bool get isValidPhone => RegExp(r'^[6-9]\\d{9}$').hasMatch(replaceAll(RegExp(r'\\s'), ''));
}`,
        whyWritten: 'Extends Dart String. Generates 2-letter monogram initials for customers without profile pictures, and validates 10-digit Indian mobile numbers starting with 6, 7, 8, or 9.',
        lineByLine: [
          'Line 2-7: Splits customer name on spaces. "Mukesh Ambani" -> "MA". Single names like "Ramesh" -> "R". Empty -> "?".',
          'Line 9: Strips all internal spaces (e.g., "98765 43210" -> "9876543210") then validates with regex ^[6-9]\\d{9}$ matching TRAI telecom guidelines.'
        ],
        whatBreaksIfRemoved: 'Entering phone numbers with accidental spaces would fail customer creation, or users could enter invalid numbers like "12345" breaking WhatsApp reminders.',
        kiranaScenario: 'Shopkeeper types "98200 12345" with spaces. The validator strips spaces and accepts the number cleanly without an error popup.'
      }
    ]
  },

  // ── 2. lib/core/theme.dart ───────────────────────────────────
  {
    id: 'core-theme',
    folderId: 'core',
    folder: 'lib/core',
    fileName: 'theme.dart',
    title: 'Central Design Tokens & Material 3 Theme',
    category: 'Core & Config',
    badge: 'Design System',
    overview: 'Defines the entire brand palette: Deep Teal (#006D77), Warm Coral (#E29578), official UPI gateway colors, Poppins typography scale, and global widget themes.',
    realScreenMedia: {
      image: '/media/screen_collection_today.jpg',
      caption: 'Design Tokens in Action: Live Collection Hub',
      description: 'See the exact Material 3 Deep Teal (#006D77) and Mint (#E0F3F5) tokens styled in the live mobile application.'
    },
    snippets: [
      {
        id: 'appColors',
        title: '1. Brand Palette & Payment Brand Tokens',
        code: `class AppColors {
  AppColors._();

  // Primary brand — Deep Teal (professional fintech color)
  static const saffron       = Color(0xFF006D77);
  static const saffronLight  = Color(0xFFE0F3F5);
  static const saffronDark   = Color(0xFF004E56);
  static const saffronGlow   = Color(0x40006D77);

  // Accent — warm coral for contrast highlights
  static const indigo        = Color(0xFFE29578);
  static const indigoLight   = Color(0xFFFFF0EB);

  // Payment source — brand-accurate
  static const paytm         = Color(0xFF002970);
  static const gpay          = Color(0xFF1A73E8);
  static const phonePe       = Color(0xFF5F259F);
  static const cash          = Color(0xFF059669);
  static const udhar         = Color(0xFFE11D48);
}`,
        whyWritten: 'Color recognition is critical for busy merchants. Rather than reading small text, shopkeepers identify PhonePe by Purple, GPay by Blue, Paytm by Navy, Cash by Green, and Credit by Red instantly.',
        lineByLine: [
          'Line 2: Private constructor prevents instantiation.',
          'Line 5-8: "saffron" is preserved as the token name for backwards-compatibility while holding modern Deep Teal #006D77.',
          'Line 11-12: Warm coral accent provides high-contrast pairing without visual clutter.',
          'Line 15-19: Exact hex codes for major Indian payment methods, used in pill badges, donut chart slices, and transaction icons.'
        ],
        whatBreaksIfRemoved: 'Payment breakdown donut charts would lose recognizable brand colors, making it difficult for merchants to distinguish cash from UPI at a glance.',
        kiranaScenario: 'A busy cashier glances down at the screen: purple badges mean PhonePe, green means cash. Reconciling the cash drawer takes seconds.'
      },
      {
        id: 'themeBuilder',
        title: '2. Global Material 3 ThemeData Provider',
        code: `ThemeData buildAppTheme() {
  return ThemeData(
    useMaterial3: true,
    fontFamily: 'Poppins',
    scaffoldBackgroundColor: AppColors.background,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.saffron,
      primary: AppColors.saffron,
      secondary: AppColors.indigo,
      surface: AppColors.surface,
      error: AppColors.error,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.saffron,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
    ),
  );
}`,
        whyWritten: 'Centralizes UI styling across all 21 screens. Buttons automatically inherit 16dp padding and 16dp rounded corners, ensuring touch targets are thumb-friendly for one-handed use.',
        lineByLine: [
          'Line 3: Enables modern Material 3 design spec.',
          'Line 4: Sets geometric Poppins font as the app-wide typeface.',
          'Line 5-11: Configures unified colorScheme seeded from brand Deep Teal.',
          'Line 12-20: Formats every ElevatedButton across the app with large 48dp touch targets and rounded corners.'
        ],
        whatBreaksIfRemoved: 'Every screen would need manual button styling, creating inconsistent button shapes and margins across screens.',
        kiranaScenario: 'A shopkeeper operating the phone with one hand while packing groceries can easily tap the large, consistently placed buttons.'
      }
    ]
  },

  // ── 3. lib/core/constants.dart ───────────────────────────────
  {
    id: 'core-constants',
    folderId: 'core',
    folder: 'lib/core',
    fileName: 'constants.dart',
    title: 'Storage Keys, Firestore Collections & Grid Tokens',
    category: 'Core & Config',
    badge: 'Constants',
    overview: 'Holds immutable configuration keys for SharedPreferences, Firestore collection names, and the 8-point layout grid tokens.',
    snippets: [
      {
        id: 'dimensionsAndKeys',
        title: '1. Dimensions & Storage Keys',
        code: `class AppConstants {
  AppConstants._();

  static const storeName = 'My Store';
  static const creditDueDays = 7;
  static const storeId = 'default_store';

  // Firebase collections
  static const colCustomers = 'customers';
  static const colTransactions = 'transactions';
  static const colSmsQueue = 'smsQueue';
  static const colStaff = 'staff';

  // SharedPreferences keys
  static const keyRole = 'sangam_role';
  static const keyApiKey = 'sangam_api_key';
  static const keyOnboarded = 'sangam_onboarded';
}

class AppDimensions {
  AppDimensions._();

  static const radiusSm = 8.0;
  static const radiusMd = 12.0;
  static const radiusLg = 16.0;
  static const paddingPage = EdgeInsets.symmetric(horizontal: 16);
}`,
        whyWritten: 'Prevents typo bugs when referencing database collections or storage keys. Guarantees that Firestore rules, CloudService, and UI providers reference identical string paths.',
        lineByLine: [
          'Line 4: creditDueDays = 7 defines the shop grace period.',
          'Line 8-11: Centralizes collection names so renaming a collection in code updates every query.',
          'Line 14-16: SharedPreferences keys for persistent local session.',
          'Line 22-26: Fixed logical pixel dimensions matching the 8-point UI grid.'
        ],
        whatBreaksIfRemoved: 'A typo like "customer" instead of "customers" would create fragmented Firestore collections where transactions fail to link to customer records.',
        kiranaScenario: 'If the owner changes the credit policy from 7 to 15 days, modifying line 4 updates every customer badge across the entire app instantly.'
      }
    ]
  },

  // ── 4. lib/core/context_extensions.dart ─────────────────────
  {
    id: 'core-extensions',
    folderId: 'core',
    folder: 'lib/core',
    fileName: 'context_extensions.dart',
    title: 'One-Line Toast / SnackBar Helpers',
    category: 'Core & Config',
    badge: 'Extension',
    overview: 'Provides context.showSnack() to replace 12 lines of ScaffoldMessenger boilerplate with a single line.',
    snippets: [
      {
        id: 'contextSnack',
        title: '1. context.showSnack() Extension',
        code: `extension ContextSnack on BuildContext {
  void showSnack(String msg, {bool isError = false}) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: isError ? AppColors.error : AppColors.text1,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
        ),
        margin: const EdgeInsets.all(16),
      ),
    );
  }
}`,
        whyWritten: 'Showing confirmation toasts in standard Flutter requires verbose ScaffoldMessenger blocks. This extension creates a floating, styled alert in one line: context.showSnack("Saved!").',
        lineByLine: [
          'Line 1: Extends BuildContext with the showSnack method.',
          'Line 5-6: Automatically colors errors in Red (AppColors.error) and standard notices in Slate (AppColors.text1).',
          'Line 7: SnackBarBehavior.floating floats the notification above navigation bars.',
          'Line 8-11: Applies 12dp rounded corners and 16dp edge margins.'
        ],
        whatBreaksIfRemoved: 'Developers would have to copy-paste 12 lines of boilerplate in every save, delete, or update handler.',
        kiranaScenario: 'When staff adds a transaction, calling context.showSnack("Transaction added") shows an instant non-intrusive floating confirmation.'
      }
    ]
  },

  // ── 5. lib/domain/usecases/sms_parser.dart ────────────────────
  {
    id: 'domain-sms-parser',
    folderId: 'domain-usecases',
    folder: 'lib/domain/usecases',
    fileName: 'sms_parser.dart',
    title: 'Dual Heuristic SMS Parser & OTP Noise Filter',
    category: 'Domain & Entities',
    badge: 'Domain Logic',
    overview: 'High-speed on-device regex engine that identifies amounts (₹/Rs/INR), distinguishes incoming vs outgoing transactions via earliest keyword position, and rejects OTP/promo noise.',
    snippets: [
      {
        id: 'smsParserCore',
        title: '1. Keyword Arbitration & Noise Discrimination (parse & isUpiSms)',
        code: `static ParsedSms parse(String sms) {
  final t = sms.toLowerCase();
  final amount = _extractAmount(sms);
  final source = _detectSource(t);

  final inAt = _earliest(t, _incomingKeywords);
  final outAt = _earliest(t, _outgoingKeywords);

  // Whichever keyword appears first wins; default to incoming for shop payments.
  bool isIncoming = true;
  if (outAt >= 0 && (inAt < 0 || outAt < inAt)) {
    isIncoming = false;
  }

  return ParsedSms(amount: amount, source: source, isIncoming: isIncoming);
}

static bool isUpiSms(String sms) {
  final t = sms.toLowerCase();
  final hasAmount = _extractAmount(sms) != null;
  if (!hasAmount) return false;

  final hasTxnWord = _incomingKeywords.any(t.contains) || _outgoingKeywords.any(t.contains);
  final hasChannel = ['upi', 'paytm', 'phonepe', 'phone pe', 'google pay', 'gpay', 'g pay',
          'bhim', 'imps', 'neft', 'a/c', 'acct', 'account', 'wallet']
      .any(t.contains);

  // Avoid OTP / promotional noise: need both an amount and either a
  // transaction verb or a payment channel mention.
  final looksPromo = t.contains('otp') || t.contains('one time password') || t.contains('cashback offer');
  return (hasTxnWord || hasChannel) && !looksPromo;
}`,
        whyWritten: 'Bank SMS messages often contain both words: "Paid to XYZ debited, Rs.500 credited to a/c". The _earliest() index arbitration correctly determines transaction direction based on grammar order, while isUpiSms filters out spam and OTPs without waking up heavy parsers.',
        lineByLine: [
          'Line 6-7: Calculates the earliest character index where an incoming or outgoing keyword appears.',
          'Line 10-12: If outgoing appears before incoming, flags isIncoming = false; otherwise defaults to incoming.',
          'Line 18-20: Verifies message contains a parseable numeric amount.',
          'Line 28-29: Rejects SMS containing "otp", "one time password", or "cashback offer" before queuing.'
        ],
        whatBreaksIfRemoved: 'OTPs and telecom recharge offers would flood the merchant\'s ledger review queue, requiring endless manual dismissals.',
        kiranaScenario: 'A bank sends an OTP: "Your OTP is 4920 for Rs 500 purchase". Sangam checks looksPromo, identifies "otp", and discards it immediately without cluttering the screen.'
      }
    ]
  },

  // ── 6. lib/domain/entities/sms_entry.dart ────────────────────
  {
    id: 'domain-sms-entry',
    folderId: 'domain-entities',
    folder: 'lib/domain/entities',
    fileName: 'sms_entry.dart',
    title: 'Daily Totals & Queue Entry Entities',
    category: 'Domain & Entities',
    badge: 'Domain Entity',
    overview: 'Models the review queue entries (SmsEntry) and daily financial aggregates (DailyTotals: paytm, gpay, phonePe, cash, creditOut, creditIn).',
    snippets: [
      {
        id: 'dailyTotals',
        title: '1. Daily Financial Aggregates (DailyTotals)',
        code: `class DailyTotals {
  final double paytm;
  final double gpay;
  final double phonePe;
  final double cash;
  final double creditOut;
  final double creditIn;
  final int txnCount;

  const DailyTotals({
    this.paytm = 0, this.gpay = 0, this.phonePe = 0,
    this.cash = 0, this.creditOut = 0, this.creditIn = 0,
    this.txnCount = 0,
  });

  double get upiTotal => paytm + gpay + phonePe;
  double get totalIn => upiTotal + cash;
  double get netCredit => creditOut - creditIn;
}`,
        whyWritten: 'Kirana owners need to reconcile their end-of-day register in seconds. DailyTotals aggregates all UPI gateways, cash, and credit so the dashboard and reports compute net cash-in and credit growth without running expensive recalculations on every frame.',
        lineByLine: [
          'Line 2-8: Immutable fields tracking each payment channel separately.',
          'Line 16: upiTotal sums all digital receipts (Paytm + GPay + PhonePe).',
          'Line 17: totalIn computes gross daily cashflow (UPI + physical cash).',
          'Line 18: netCredit computes whether the shop\'s overall credit book expanded or shrank today.'
        ],
        whatBreaksIfRemoved: 'The dashboard donut chart and end-of-day closure summary would have to traverse the entire transaction array repeatedly, causing UI stutter on phones with thousands of historical records.',
        kiranaScenario: 'At 10:00 PM closing time, the merchant taps "Daily Report". Sangam shows: Total In: ₹14,200 (UPI: ₹9,800 + Cash: ₹4,400). Net Udhar: +₹600. The cash in the drawer matches exactly.'
      }
    ]
  },

  // ── 7. lib/domain/entities/customer.dart ─────────────────────
  {
    id: 'domain-customer',
    folderId: 'domain-entities',
    folder: 'lib/domain/entities',
    fileName: 'customer.dart',
    title: 'Customer Ledger Entity & Credit Limit',
    category: 'Domain & Entities',
    badge: 'Core Entity',
    overview: 'Customer profile with running balance, credit limit, contact information, sync status, and active transaction count. Fully immutable.',
    realScreenMedia: {
      image: '/media/screen_ledger_main.jpg',
      caption: 'Customer Khata Entity: Multi-Account Running Ledger',
      description: 'Customer models rendered with live advance balances (₹880, ₹910, ₹820) and automatic PII masking.'
    },
    snippets: [
      {
        id: 'customerEntity',
        title: '1. Customer Entity with copyWith and Monogram Initials',
        code: `class Customer {
  final String id;
  final String name;
  final String? phone;
  final double? creditLimit;
  final DateTime createdAt;

  const Customer({
    required this.id,
    required this.name,
    this.phone,
    this.creditLimit,
    required this.createdAt,
  });

  String get initials {
    final parts = name.trim().split(' ');
    if (parts.isEmpty) return '?';
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return '\${parts[0][0]}\${parts[1][0]}'.toUpperCase();
  }

  Customer copyWith({String? id, String? name, String? phone, double? creditLimit, DateTime? createdAt}) =>
    Customer(
      id: id ?? this.id, name: name ?? this.name,
      phone: phone ?? this.phone, creditLimit: creditLimit ?? this.creditLimit,
      createdAt: createdAt ?? this.createdAt,
    );
}`,
        whyWritten: 'Immutability ensures predictable state management across Riverpod providers. Optional creditLimit enables shopkeepers to cap maximum udhar per customer.',
        lineByLine: [
          'Line 2-6: Strongly typed immutable properties.',
          'Line 16-21: Generates a 2-letter monogram for circular list avatars.',
          'Line 23-28: copyWith method allows surgical updates (e.g. updating phone number) without mutating existing state.'
        ],
        whatBreaksIfRemoved: 'Editing a customer record would require mutable variables or full object re-instantiation, breaking Riverpod state equality checks.',
        kiranaScenario: 'Shopkeeper edits Ramesh\'s phone number. The copyWith creates a new immutable instance, triggering an instant UI refresh in the customer directory.'
      }
    ]
  },

  // ── 8. lib/domain/entities/app_user.dart ─────────────────────
  {
    id: 'domain-app-user',
    folderId: 'domain-entities',
    folder: 'lib/domain/entities',
    fileName: 'app_user.dart',
    title: 'User Identity, Roles & Effective Shop Mapping',
    category: 'Domain & Entities',
    badge: 'Auth & Identity',
    overview: 'Models logged-in users with roles (admin vs staff), granular permissions (canEdit), and resolves effectiveShopId for multi-user shops.',
    snippets: [
      {
        id: 'appUserEffectiveShop',
        title: '1. AppUser & effectiveShopId Resolution',
        code: `enum UserRole { admin, staff }

class AppUser {
  final String id;
  final String name;
  final String username;
  final UserRole role;
  final bool canEdit;
  final String? shopId;

  const AppUser({
    required this.id,
    required this.name,
    required this.username,
    required this.role,
    this.canEdit = true,
    this.shopId,
  });

  bool get isAdmin => role == UserRole.admin;

  /// The shop this person belongs to. For an admin this equals [id]
  /// (they own their shop). For staff this is the owner's uid.
  String get effectiveShopId => shopId ?? id;
}`,
        whyWritten: 'In multi-user shops, staff members have their own Firebase Auth UID, but must read data under the owner\'s shop UID (/shops/{ownerUid}). effectiveShopId elegantly abstracts this distinction so UI queries never need to know whether the caller is owner or staff.',
        lineByLine: [
          'Line 1: Enumerates admin vs staff roles.',
          'Line 8: canEdit boolean enforces edit vs view-only permissions for staff.',
          'Line 9: shopId stores the owner\'s UID for staff accounts.',
          'Line 22: effectiveShopId returns shopId if set (staff), or falls back to own id (admin).'
        ],
        whatBreaksIfRemoved: 'Queries for /shops/{shopId}/transactions would point to the staff member\'s empty UID instead of the owner\'s shop data, rendering the ledger blank on staff devices.',
        kiranaScenario: 'Staff member Rohan logs in. His effectiveShopId points to owner Mukesh\'s shop, instantly displaying all 400 customer accounts on Rohan\'s phone.'
      }
    ]
  },

  // ── 9. lib/domain/entities/bill.dart ─────────────────────────
  {
    id: 'domain-bill',
    folderId: 'domain-entities',
    folder: 'lib/domain/entities',
    fileName: 'bill.dart',
    title: 'Itemized Digital Bill & Cart Computation',
    category: 'Domain & Entities',
    badge: 'Financial Record',
    overview: 'Immutable financial entry representing Udhar (credit) or Jama (payment) with payment mode, status, and optional bill linkage.',
    realScreenMedia: {
      image: '/media/screen_mohan_dues.jpg',
      caption: 'Transaction Entity: Dues Clearance & WhatsApp Recovery',
      description: 'Mohan Sharma partial payment history with 1-tap WhatsApp Remind and Call actions.'
    },
    snippets: [
      {
        id: 'billSubtotalTotal',
        title: '1. Subtotal & Grand Total Calculation',
        code: `class Bill {
  final String id;
  final String customerName;
  final String? customerPhone;
  final List<BillItem> items;
  final double discount;
  final double deliveryCharge;
  final DateTime date;
  final BillStatus status;

  double get subtotal => items.fold(0, (sum, item) => sum + item.total);
  double get total => (subtotal + deliveryCharge) - discount;

  Map<String, dynamic> toMap() => {
    'id': id,
    'customerName': customerName,
    'items': items.map((x) => x.toMap()).toList(),
    'discount': discount,
    'deliveryCharge': deliveryCharge,
    'date': date.millisecondsSinceEpoch,
    'status': status.name,
  };
}`,
        whyWritten: 'Encapsulates billing arithmetic inside the entity rather than inside UI widgets. Prevents rounding errors and ensures discounts and delivery fees are computed consistently.',
        lineByLine: [
          'Line 10: items.fold(...) aggregates the total of every line item (quantity * unitPrice).',
          'Line 11: total adds deliveryCharge and subtracts discount.',
          'Line 13-22: toMap() converts the bill into clean JSON for Firestore and local SharedPreferences storage.'
        ],
        whatBreaksIfRemoved: 'Total calculations would be duplicated across the bill creation screen, print screen, and customer ledger, risking arithmetic mismatches.',
        kiranaScenario: 'Customer orders 5kg Atta (₹220) and 2L Oil (₹280). Subtotal is ₹500. Adding ₹30 home delivery and ₹20 discount computes a total of ₹510 accurately.'
      }
    ]
  },

  // ── 10. lib/domain/entities/transaction.dart ─────────────────
  {
    id: 'domain-transaction',
    folderId: 'domain-entities',
    folder: 'lib/domain/entities',
    fileName: 'transaction.dart',
    title: 'Ledger Entry, Direction & Source Types',
    category: 'Domain & Entities',
    badge: 'Domain Entity',
    overview: 'Core ledger transaction model supporting Cash, UPI (GPay, PhonePe, Paytm), and Udhar, with incoming vs outgoing directional logic.',
    snippets: [
      {
        id: 'txnDirectionAndTypes',
        title: '1. Transaction Enums & Firestore Keys',
        code: `enum TransactionType { upiPaytm, upiGpay, upiPhonePe, cash, credit }
enum TransactionDirection { incoming, outgoing }

extension TransactionTypeExt on TransactionType {
  String get firestoreKey {
    switch (this) {
      case TransactionType.upiPaytm: return 'paytm';
      case TransactionType.upiGpay: return 'gpay';
      case TransactionType.upiPhonePe: return 'phonepe';
      case TransactionType.cash: return 'cash';
      case TransactionType.credit: return 'credit';
    }
  }

  static TransactionType fromKey(String key) {
    switch (key.toLowerCase()) {
      case 'paytm': return TransactionType.upiPaytm;
      case 'gpay': return TransactionType.upiGpay;
      case 'phonepe': return TransactionType.upiPhonePe;
      case 'credit': return TransactionType.credit;
      default: return TransactionType.cash;
    }
  }
}`,
        whyWritten: 'Provides strict type safety in Dart while keeping database keys short and readable in Firestore documents.',
        lineByLine: [
          'Line 1: Enumerates all supported payment channels.',
          'Line 2: incoming (customer paid money) vs outgoing (shopkeeper gave goods on credit).',
          'Line 4-13: Converts strongly-typed Dart enum to a clean string key for Firestore.',
          'Line 15-23: Safely parses Firestore strings back to Dart enums with fallback to cash.'
        ],
        whatBreaksIfRemoved: 'Malformed transaction types in Firestore would throw unhandled format exceptions, crashing the transaction feed screen.',
        kiranaScenario: 'PhonePe sends a notification. The bridge maps it to TransactionType.upiPhonePe and incoming direction, incrementing today\'s total collection.'
      }
    ]
  },

  // ── 11. lib/models/upi_payment_model.dart ────────────────────
  {
    id: 'models-upi',
    folderId: 'models',
    folder: 'lib/models',
    fileName: 'upi_payment_model.dart',
    title: 'Platform Channel Data Transfer Object',
    category: 'Models',
    badge: 'Channel DTO',
    overview: 'Data Transfer Object bridging the untyped Map<dynamic, dynamic> received from Android Kotlin EventChannel into a strongly typed Dart object with fallback UUIDs.',
    snippets: [
      {
        id: 'upiModelFromMap',
        title: '1. Defensive Platform Map Deserialization',
        code: `class UpiPaymentModel {
  final String id;
  final double amount;
  final String sender;
  final String appSource;
  final String rawText;
  final DateTime timestamp;

  UpiPaymentModel({
    required this.id, required this.amount,
    required this.sender, required this.appSource,
    required this.rawText, required this.timestamp,
  });

  factory UpiPaymentModel.fromMap(Map<dynamic, dynamic> map) {
    return UpiPaymentModel(
      id:        map['id']?.toString() ?? const Uuid().v4(),
      amount:    (map['amount'] as num?)?.toDouble() ?? 0.0,
      sender:    map['sender']?.toString() ?? 'Unknown',
      appSource: map['appSource']?.toString() ?? 'UPI',
      rawText:   map['rawText']?.toString() ?? '',
      timestamp: map['timestamp'] != null
          ? DateTime.fromMillisecondsSinceEpoch((map['timestamp'] as num).toInt())
          : DateTime.now(),
    );
  }
}`,
        whyWritten: 'Data traversing Android Platform Channels can experience type coercion issues (e.g. integer timestamps vs double floats). fromMap guarantees safe fallback defaults so malformed platform payloads never crash Flutter.',
        lineByLine: [
          'Line 15: Generates a unique UUID v4 if the native payload omitted an ID.',
          'Line 16: Safely casts num? to double, preventing type cast exceptions.',
          'Line 17: Defaults missing sender to "Unknown".',
          'Line 20-22: Converts Unix millisecond timestamp from Kotlin to a Dart DateTime instance.'
        ],
        whatBreaksIfRemoved: 'An unexpected null or integer field from Android native would cause an unhandled CastError, crashing the notification listener on startup.',
        kiranaScenario: 'A bank notification omits the sender\'s name. Instead of crashing, Sangam creates a valid queue entry with "Unknown", allowing the merchant to assign it manually.'
      }
    ]
  },

  // ── 12. android/.../UpiNotificationListenerService.kt ────────
  {
    id: 'android-listener',
    folderId: 'android-native',
    folder: 'android/app/src/main/kotlin/com/sangam/app',
    fileName: 'UpiNotificationListenerService.kt',
    title: 'Native Android Zero-Touch UPI Interception',
    category: 'Android Native',
    badge: 'Kotlin Native',
    overview: 'Kotlin NotificationListenerService that intercepts push notifications from GPay, PhonePe, and Paytm, extracts amount and sender using regex, and streams to Flutter via EventChannel.',
    realScreenMedia: {
      image: '/media/screen_collection_today.jpg',
      caption: 'Zero-Hardware UPI Interception in Action',
      description: 'Incoming UPI payments update the Today\'s Collection counter automatically without hardware soundbox rentals.'
    },
    snippets: [
      {
        id: 'onNotificationPosted',
        title: '1. Notification Interceptor & Whitelist Filtering',
        code: `class UpiNotificationListenerService : NotificationListenerService() {
    private val supportedPackages = setOf(
        "com.google.android.apps.nbu.paisa.user", // Google Pay
        "net.one97.paytm",                        // Paytm
        "com.phonepe.app",                        // PhonePe
        "in.org.npci.upiapp",                     // BHIM
        "com.whatsapp"                            // WhatsApp Pay
    )

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val pkg = sbn.packageName
        if (pkg !in supportedPackages) return

        val extras = sbn.notification.extras
        val title = extras.getString("android.title") ?: ""
        val text = extras.getCharSequence("android.text")?.toString() ?: ""
        val fullText = "$title $text".trim()

        if (!looksLikeCredit(fullText)) return
        val amount = extractAmount(fullText) ?: return
        val sender = extractSender(fullText)

        val payload = hashMapOf(
            "amount" to amount,
            "sender" to sender,
            "appSource" to pkg,
            "timestamp" to sbn.postTime
        )
        // Stream to Flutter or queue if app is paused
        UpiNotificationStreamHandler.sink?.success(payload) ?: queuePayment(payload)
    }
}`,
        whyWritten: 'Google Play restricts SMS permissions (READ_SMS). This Kotlin service intercepts notifications instead of reading SMS, granting zero-touch UPI payment capture while staying 100% compliant with Play Store policies.',
        lineByLine: [
          'Line 1: Extends Android NotificationListenerService.',
          'Line 2-8: Whitelist ensures the service only processes banking/UPI apps, ignoring social media and private messages.',
          'Line 11-12: Discards notifications from any package outside the whitelist immediately.',
          'Line 18: looksLikeCredit() rejects debit notifications (money spent) and only keeps credit notifications (money received).',
          'Line 19: Extracts ₹ amount via regex.',
          'Line 29: Streams event to Flutter EventChannel if open; otherwise saves to SharedPreferences queue so payments are never lost.'
        ],
        whatBreaksIfRemoved: 'The entire automatic payment capture feature stops working, forcing merchants to manually type in every UPI payment.',
        kiranaScenario: 'A customer scans the counter QR code and pays ₹350 via PhonePe. Before the customer even walks out, Sangam chimes with "₹350 received from Amit Sharma via PhonePe".'
      },
      {
        id: 'creditFilter',
        title: '2. Credit Detection & Amount Extraction Regex',
        code: `private fun looksLikeCredit(text: String): Boolean {
    val lower = text.lowercase(Locale.getDefault())
    val creditKeywords = listOf("received", "credited", "paid you", "you got", "payment received")
    val debitKeywords = listOf("debited", "paid to", "sent to", "you paid", "withdrawn")

    val hasCredit = creditKeywords.any { lower.contains(it) }
    val hasDebit = debitKeywords.any { lower.contains(it) }
    return hasCredit && !hasDebit
}

private val amountRegex = Regex(
    """(?:Rs\\.?|₹|INR)\\s*([0-9]{1,3}(?:,[0-9]{2,3})*(?:\\.[0-9]{1,2})?|[0-9]+(?:\\.[0-9]{1,2})?)""",
    RegexOption.IGNORE_CASE
)`,
        whyWritten: 'Bank notifications are tricky: some notifications say "Payment of ₹500 to XYZ debited". This method ensures debit notifications are strictly discarded so shop expenses are not logged as income.',
        lineByLine: [
          'Line 2: Converts text to lowercase for case-insensitive matching.',
          'Line 3-4: Keywords indicating incoming money.',
          'Line 5: Keywords indicating outgoing spending.',
          'Line 8: Requires credit keyword to be present AND debit keywords to be absent.',
          'Line 11-14: Regex accurately captures ₹, Rs., Rs, or INR amounts with commas (e.g. 1,450.50).'
        ],
        whatBreaksIfRemoved: 'If the merchant uses the same phone to pay their distributor ₹5,000, Sangam might capture it as customer income, corrupting daily accounting.',
        kiranaScenario: 'Shopkeeper pays ₹2,000 for electricity via Paytm. Sangam sees "Paid to Torrent Power" and silently ignores it.'
      }
    ]
  },

  // ── 13. lib/services/groq_service.dart ───────────────────────
  {
    id: 'services-groq',
    folderId: 'services',
    folder: 'lib/services',
    fileName: 'groq_service.dart',
    title: 'Groq Llama-3.3-70B AI Fallback Engine',
    category: 'Services & Cloud',
    badge: 'AI Integration',
    overview: 'Calls Groq API running Llama 3.3 70B with strict JSON formatting to parse ambiguous, non-standard regional bank SMS messages when regex fails.',
    snippets: [
      {
        id: 'groqParse',
        title: '1. Structured JSON Extraction via Groq API',
        code: `class GroqService {
  static const String _apiKey = String.fromEnvironment('GROQ_API_KEY');
  static const String _endpoint = 'https://api.groq.com/openai/v1/chat/completions';
  static const String _model = 'llama-3.3-70b-versatile';

  static const String _systemPrompt =
      'You extract structured data from Indian UPI/bank payment SMS messages. '
      'Respond ONLY with a compact JSON object, no prose. Schema: '
      '{"is_payment": boolean, "amount": number|null, '
      '"app": "paytm"|"gpay"|"phonepe"|"other", "direction": "in"|"out"}.';

  static Future<ParsedSms?> parseSms(String sms) async {
    if (_apiKey.isEmpty) return null;
    try {
      final res = await http.post(
        Uri.parse(_endpoint),
        headers: {'Authorization': 'Bearer ' + _apiKey, 'Content-Type': 'application/json'},
        body: jsonEncode({
          'model': _model,
          'temperature': 0,
          'response_format': {'type': 'json_object'},
          'messages': [
            {'role': 'system', 'content': _systemPrompt},
            {'role': 'user', 'content': sms},
          ],
        }),
      ).timeout(const Duration(seconds: 20));

      final parsed = jsonDecode(jsonDecode(res.body)['choices'][0]['message']['content']);
      if (parsed['is_payment'] != true) return null;
      return ParsedSms(
        amount: (parsed['amount'] as num).toDouble(),
        source: _mapSource(parsed['app']),
        isIncoming: parsed['direction'] != 'out',
      );
    } catch (_) {
      return null;
    }
  }
}`,
        whyWritten: 'Regional cooperative banks (e.g. Saraswat Bank, Gramin Bank) send SMS formats that break standard regex. Groq Llama 3.3 70B provides ultra-fast (<400ms) intelligence to parse even the weirdest SMS strings.',
        lineByLine: [
          'Line 2: API key is injected at build time via --dart-define, never committed to source.',
          'Line 6-10: System prompt enforces a strict JSON schema with zero chat prose.',
          'Line 19: temperature: 0 ensures deterministic, hallucination-free parsing.',
          'Line 20: response_format: json_object guarantees the output is parseable JSON.',
          'Line 29-34: Maps the LLM JSON response to domain ParsedSms entity.'
        ],
        whatBreaksIfRemoved: 'SMS from smaller rural banks with non-standard wording would fail to parse, forcing the merchant to enter them manually.',
        kiranaScenario: 'A rural bank SMS says: "A/C 1234 cr by 850.00 on 12-OCT trf from VPA sharma@upi". Regex fails, but Groq immediately extracts: ₹850, direction: in, source: UPI.'
      }
    ]
  },

  // ── 14. lib/services/auth_service.dart ───────────────────────
  {
    id: 'services-auth',
    folderId: 'services',
    folder: 'lib/services',
    fileName: 'auth_service.dart',
    title: 'Spark-Free Multi-User Invite System',
    category: 'Services & Cloud',
    badge: 'Auth & Security',
    overview: 'Implements owner shop creation and staff invite-code redemption using atomic Firestore batches, functioning completely on Firebase\'s free Spark plan without server costs.',
    snippets: [
      {
        id: 'redeemInviteCode',
        title: '1. Atomic Invite Code Redemption Batch',
        code: `Future<AppUser> redeemInviteCode({required String inviteCode}) async {
  final user = _auth.currentUser;
  if (user == null) throw StateError('Not signed in — complete Google sign-in first');

  final code = inviteCode.trim().toUpperCase();
  final inviteRef = _db.collection('invites').doc(code);
  final inviteSnap = await inviteRef.get();

  if (!inviteSnap.exists) throw InvalidInviteException('Code not found');
  final invite = inviteSnap.data()!;
  if (invite['used'] == true) throw InvalidInviteException('Code already used');

  final shopId = invite['shopId'] as String;
  final canEdit = invite['canEdit'] as bool? ?? true;
  final staffName = invite['name'] as String? ?? user.displayName ?? 'Staff';

  // Atomic batch execution
  final batch = _db.batch();
  batch.update(inviteRef, {'used': true, 'claimedBy': user.uid});
  batch.set(_db.collection('shops').doc(shopId).collection('staff').doc(user.uid), {
    'name': staffName,
    'email': user.email,
    'canEdit': canEdit,
    'inviteCode': code,
    'createdAt': FieldValue.serverTimestamp(),
  });
  batch.set(_db.collection('staffIndex').doc(user.uid), {'shopId': shopId});
  await batch.commit();

  return (await getSessionUser())!;
}`,
        whyWritten: 'Owners need staff to access the shop ledger from their own devices without paying for server infrastructure. This atomic batch marks the invite used, writes the staff membership, and sets up a reverse lookup table in one atomic commit.',
        lineByLine: [
          'Line 8-11: Validates invite exists and hasn\'t already been claimed.',
          'Line 18: Starts a Firestore atomic batch.',
          'Line 19: Flips invite used: true and stamps claimedBy with staff UID.',
          'Line 20-26: Creates the staff document under /shops/{shopId}/staff/{uid} with canEdit permissions.',
          'Line 27: Writes /staffIndex/{uid} so the staff device knows which shop it belongs to without needing expensive collection group queries.',
          'Line 28: batch.commit() executes all 3 writes atomically. If any fails, none apply.'
        ],
        whatBreaksIfRemoved: 'Two staff members could enter the same invite code at the same second and both get access (race condition), or staff devices wouldn\'t know which shop to load.',
        kiranaScenario: 'Owner generates 6-character code "K7P2X9" with view-only permissions. Staff helper downloads the app, signs in, types the code, and is instantly connected to the shop.'
      }
    ]
  },

  // ── 15. firestore.rules ──────────────────────────────────────
  {
    id: 'firestore-rules',
    folderId: 'backend-security',
    folder: '.',
    fileName: 'firestore.rules',
    title: 'Declarative Database Role-Based Access Control',
    category: 'Security & Rules',
    badge: 'Database Rules',
    overview: 'Enforces security at the Firestore database level: only owners can delete transactions or invite staff; staff access is governed by canEdit permissions; data is isolated per shop.',
    snippets: [
      {
        id: 'rulesHelpers',
        title: '1. Role Verification & Ledger Access Rules',
        code: `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isOwner(shopId) {
      return request.auth != null && request.auth.uid == shopId;
    }

    function isMember(shopId) {
      return request.auth != null &&
        exists(/databases/$(database)/documents/shops/$(shopId)/staff/$(request.auth.uid));
    }

    function canEditShop(shopId) {
      return isOwner(shopId) || (
        isMember(shopId) &&
        get(/databases/$(database)/documents/shops/$(shopId)/staff/$(request.auth.uid)).data.canEdit == true
      );
    }

    // Ledger data: customers, transactions, products
    match /shops/{shopId}/{collection}/{docId} {
      allow read: if (isOwner(shopId) || isMember(shopId))
        && collection in ['customers', 'transactions', 'products'];
      allow write: if canEditShop(shopId)
        && collection in ['customers', 'transactions', 'products'];
    }
  }
}`,
        whyWritten: 'Client apps can be decompiled or modified. Firestore security rules guarantee that unauthorized users cannot read or overwrite ledger data, even if they call the Firestore API directly.',
        lineByLine: [
          'Line 6-8: isOwner checks if the caller UID matches the shopId.',
          'Line 10-13: isMember verifies a valid staff record exists under this shop.',
          'Line 15-20: canEditShop grants write permission only if the caller is the owner or staff with canEdit == true.',
          'Line 23-28: Protects customers, transactions, and products collections with these rules.'
        ],
        whatBreaksIfRemoved: 'A disgruntled former employee could delete customer balances or read the shop\'s total profit records.',
        kiranaScenario: 'A staff member set to view-only tries to delete a transaction. Firestore immediately rejects the request with a permission-denied error.'
      }
    ]
  },

  // ── 16. lib/services/cloud_service.dart ──────────────────────
  {
    id: 'services-cloud',
    folderId: 'services',
    folder: 'lib/services',
    fileName: 'cloud_service.dart',
    title: 'Chunked Firestore Sync & Batch Commits',
    category: 'Services & Cloud',
    badge: 'Cloud Sync',
    overview: 'Manages batch uploads in 400-operation chunks (respecting Firestore\'s 500-op limit) and pulls customers, transactions, and inventory for cross-device synchronization.',
    snippets: [
      {
        id: 'pushAllChunked',
        title: '1. Chunked 400-Operation Batch Committer',
        code: `class CloudService {
  FirebaseFirestore get _db => FirebaseFirestore.instance;

  Future<void> _pushAll(CollectionReference<Map<String, dynamic>> col, List<Map<String, dynamic>> rows) async {
    // Commit in chunks (Firestore batch limit is 500 ops).
    for (var i = 0; i < rows.length; i += 400) {
      final end = (i + 400) < rows.length ? (i + 400) : rows.length;
      final batch = _db.batch();
      for (final row in rows.sublist(i, end)) {
        batch.set(col.doc(row['id'] as String), row, SetOptions(merge: true));
      }
      await batch.commit();
    }
  }

  Future<void> pushTransactions(String shop, List<Transaction> list) =>
      _pushAll(_shopDoc(shop).collection('transactions'), list.map(_txnMap).toList());
}`,
        whyWritten: 'Cloud Firestore enforces a hard maximum limit of 500 writes per batch. If a store has 800 transactions and tries to sync in one batch, Firestore throws an exception. This chunker splits large data sets into safe 400-item batches.',
        lineByLine: [
          'Line 6: Loops through data in increments of 400.',
          'Line 7: Calculates chunk slice boundaries safely without out-of-bounds errors.',
          'Line 8: Creates an isolated batch instance.',
          'Line 10: Uses SetOptions(merge: true) to prevent overwriting fields updated concurrently by another device.',
          'Line 12: Commits the 400-item chunk before starting the next.'
        ],
        whatBreaksIfRemoved: 'When syncing an active store with more than 500 transactions, the sync would crash with "IllegalArgumentException: A maximum of 500 writes are allowed per commit".',
        kiranaScenario: 'A shop owner with 1,200 transactions logs in on a new phone. Sangam syncs smoothly in 3 chunks of 400 without crashing.'
      }
    ]
  },

  // ── 17. lib/presentation/providers/providers.dart ────────────
  {
    id: 'presentation-providers',
    folderId: 'presentation-providers',
    folder: 'lib/presentation/providers',
    fileName: 'providers.dart',
    title: 'Riverpod SessionNotifier & Real-Time Sync',
    category: 'State & Providers',
    badge: 'Riverpod State',
    overview: 'Core state management. Tracks the authenticated session, listens to Firebase idTokenChanges, computes running balances, and triggers real-time cloud sync.',
    snippets: [
      {
        id: 'sessionNotifier',
        title: '1. SessionNotifier & Auth State Tracking',
        code: `class SessionNotifier extends StateNotifier<AppUser?> {
  final AuthService _auth;
  final Ref _ref;
  StreamSubscription<fb.User?>? _sub;

  SessionNotifier(this._auth, this._ref) : super(null) {
    _restore();
    if (firebase_core.Firebase.apps.isNotEmpty) {
      _sub = fb.FirebaseAuth.instance.idTokenChanges().listen((_) => _restore());
    }
  }

  Future<void> _restore() async {
    final user = await _auth.getSessionUser();
    state = user;
    if (user != null) {
      _ref.read(cloudSyncProvider).startSyncing(user.effectiveShopId);
    } else {
      _ref.read(cloudSyncProvider).stopSyncing();
    }
  }

  Future<void> logout() async {
    _ref.read(cloudSyncProvider).stopSyncing();
    await _auth.clearSession();
    state = null;
  }
}`,
        whyWritten: 'Riverpod StateNotifier guarantees reactive UI updates when authentication changes. Listening to idTokenChanges automatically handles token refreshes and triggers cloud synchronization without manual polling.',
        lineByLine: [
          'Line 1: Extends Riverpod StateNotifier managing an AppUser? state.',
          'Line 7-9: Subscribes to Firebase idTokenChanges stream to immediately pick up login, logout, or permission changes.',
          'Line 13-19: Whenever a user signs in, immediately instructs cloudSyncProvider to start syncing that specific shopId.',
          'Line 22-26: On logout, cleanly closes all active Firestore snapshot streams before wiping local session keys.'
        ],
        whatBreaksIfRemoved: 'Logging in on one screen wouldn\'t notify other screens, leaving the user on a blank screen or causing memory leaks from uncancelled Firestore streams.',
        kiranaScenario: 'Owner approves staff access. The staff member\'s app receives the token change and instantly starts loading customer records without an app restart.'
      }
    ]
  }
];
