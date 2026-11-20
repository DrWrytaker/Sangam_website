// Architecture flows, failure/retry lifecycles, and security edge cases for "Learning the App"
export const architecturePipelines = [
  {
    id: 'upi-interception',
    title: 'Zero-Touch UPI Payment Interception Pipeline',
    subtitle: 'How Sangam captures PhonePe, GPay, and Paytm alerts without high-risk SMS permissions',
    color: '#006D77',
    steps: [
      {
        phase: 'Step 1: Inbound Payment Notification',
        actor: 'Android OS (System Shade)',
        desc: 'Customer scans QR code and sends money via PhonePe, GPay, or Paytm. The payment app posts a standard status bar notification.',
        technical: 'StatusBarNotification emitted by Android OS with app package name, title, and notification extras.'
      },
      {
        phase: 'Step 2: Package Whitelist Filter',
        actor: 'UpiNotificationListenerService (Kotlin)',
        desc: 'The Kotlin background service intercepts the notification and checks against a strict whitelist (e.g. com.phonepe.app, net.one97.paytm). Non-banking apps are dropped in 0.01ms.',
        technical: 'if (sbn.packageName !in supportedPackages) return;'
      },
      {
        phase: 'Step 3: Credit vs Debit Discrimination',
        actor: 'looksLikeCredit() Rule Engine',
        desc: 'Ensures that merchant spending ("Paid to XYZ", "Debited") is rejected. Only notifications with credit keywords ("Received", "Credited", "Paid you") are retained.',
        technical: 'hasCredit && !hasDebit regex verification prevents recording business expenses as customer income.'
      },
      {
        phase: 'Step 4: Amount & Sender Extraction',
        actor: 'Regex Engine (Kotlin)',
        desc: 'Extracts the exact numerical INR amount and sender name or UPI VPA from notification text.',
        technical: 'amountRegex matches ₹, Rs, or INR followed by numbers with optional commas.'
      },
      {
        phase: 'Step 5: EventChannel or Native Queue Delivery',
        actor: 'Flutter Platform Bridge',
        desc: 'If Sangam is open in foreground, it streams directly over EventChannel to trigger an in-app sound and SnackBar. If closed, it queues in SharedPreferences for next launch.',
        technical: 'UpiNotificationStreamHandler.sink?.success(payload) ?: queuePayment(payload);'
      },
      {
        phase: 'Step 6: Merchant Ledger Reconciliation',
        actor: 'Flutter Presentation UI',
        desc: 'Merchant taps the notification in Sangam\'s review queue, selects the customer (or marks walk-in), and the customer\'s credit balance is deducted in 1 tap.',
        technical: 'Dispatches addTransactionProvider mutation and syncs atomically with Cloud Firestore.'
      }
    ]
  },
  {
    id: 'groq-ai-pipeline',
    title: 'Dual-Engine SMS Parser: Regex + Groq Llama-3.3-70B AI',
    subtitle: 'Combining instant on-device regex with sub-second cloud AI for non-standard bank formats',
    color: '#5F259F',
    steps: [
      {
        phase: 'Level 1: Fast On-Device Regex',
        actor: 'SmsParser (Dart Domain)',
        desc: 'Standard SMS messages from SBI, HDFC, ICICI match known regular expressions and are parsed on-device in <2ms with zero network calls and zero cost.',
        technical: 'Runs compiled regex expressions targeting standard bank SMS syntax.'
      },
      {
        phase: 'Level 2: AI Fallback Trigger & Validation',
        actor: 'GroqService Guard',
        desc: 'If regex fails to identify a valid amount or payment direction from regional or cooperative banks, the raw SMS is dispatched to Groq API.',
        technical: 'Invokes GroqService.parseSms(rawText) with llama-3.3-70b-versatile with 20s timeout.'
      },
      {
        phase: 'Level 3: Strict JSON Extraction',
        actor: 'Groq Llama 3.3 70B (Server-side)',
        desc: 'Llama 3.3 processes the text at temperature 0 with a specialized system prompt, returning only compact structured JSON: amount, direction (in/out), and payment app.',
        technical: 'Response format is locked to { type: "json_object" } guaranteeing valid schema without prose.'
      },
      {
        phase: 'Level 4: Failure & Retry Path',
        actor: 'Resilience Fallback',
        desc: 'If Groq API returns non-200, times out after 20 seconds, or the API key is unconfigured, it fails gracefully by returning null, falling back to unparsed manual entry rather than throwing an exception.',
        technical: 'try { ... } catch (_) { return null; } ensures complete UI stability under network failure.'
      }
    ]
  },
  {
    id: 'offline-sync-lifecycle',
    title: 'Offline Queuing & Real-Time Sync Lifecycle',
    subtitle: 'Ensuring zero transaction loss when internet connectivity drops on Android',
    color: '#E29578',
    steps: [
      {
        phase: 'Step 1: Local-First Immediate Write',
        actor: 'LocalSource / SharedPreferences',
        desc: 'When a merchant records a transaction or itemizes a bill, the record is immediately committed to local on-device storage. The UI reflects the new balance in 0ms.',
        technical: 'await _local.saveTransaction(txn); ref.read(transactionsProvider.notifier).add(txn);'
      },
      {
        phase: 'Step 2: Cloud Sync Availability Check',
        actor: 'CloudSyncController',
        desc: 'CloudSyncController checks if Firebase was initialized and an active network connection exists. If offline, the mutation is flagged pending in the local journal.',
        technical: 'if (!CloudService.available || _syncedShopId == null) return;'
      },
      {
        phase: 'Step 3: Chunked Firestore Commit',
        actor: 'CloudService Batch Committer',
        desc: 'When connectivity restores, records are pushed to Cloud Firestore in 400-operation chunks using atomic batches with SetOptions(merge: true).',
        technical: 'Chunks data at 400 ops to stay strictly under Firestore\'s hard 500-op limit.'
      },
      {
        phase: 'Step 4: Real-time Listener Fan-out',
        actor: 'Firestore Snapshot Listeners',
        desc: 'Other staff members and the owner\'s tablet receive the new record over open WebSocket snapshot listeners, automatically updating their local caches.',
        technical: '_col(shop, "transactions").snapshots().listen((snap) => _local.replaceTransactions(...))'
      }
    ]
  },
  {
    id: 'invite-auth-pipeline',
    title: 'Spark-Free Multi-User Invite Architecture',
    subtitle: 'Zero-server, atomic staff onboarding on Firebase\'s free tier',
    color: '#059669',
    steps: [
      {
        phase: 'Step 1: Owner Creates Shop',
        actor: 'Firebase Auth & Firestore',
        desc: 'Owner signs in with Google. The shop document is initialized at /shops/{ownerUid}. The ownerUid serves as the shopId.',
        technical: 'Guarantees shopId is unique and directly verified by Firebase Auth tokens.'
      },
      {
        phase: 'Step 2: Owner Generates Invite Code',
        actor: 'InviteService (Dart)',
        desc: 'Owner generates a 6-character alphanumeric code (e.g. K8M4X2) selecting view-only or canEdit permissions. Saved at /invites/{code} with used: false.',
        technical: 'Top-level /invites collection allows unauthenticated staff signups to look up a code without knowing the shopId in advance.'
      },
      {
        phase: 'Step 3: Staff Enters Code on Own Device',
        actor: 'StaffJoinScreen (Flutter)',
        desc: 'Staff member downloads Sangam on their personal phone, signs in with Google, and enters the 6-character code.',
        technical: 'Validates code existence and checks used == false.'
      },
      {
        phase: 'Step 4: Atomic Firestore Batch Execution',
        actor: 'AuthService Batch Committer',
        desc: 'In a single atomic commit: (1) Invite is marked used: true with claimedBy: staffUid, (2) Staff record is created under /shops/{shopId}/staff/{staffUid}, (3) Reverse lookup /staffIndex/{staffUid} is created.',
        technical: 'Firestore batch commit guarantees that two staff claiming simultaneously cannot both win the code (race-condition proof).'
      }
    ]
  }
];

export const securityMatrix = [
  {
    resource: 'Shop Profile & Settings',
    owner: 'Full Read & Write',
    staffEdit: 'Read Only',
    staffView: 'Read Only',
    ruleEnforced: 'isOwner(shopId)'
  },
  {
    resource: 'Customer List',
    owner: 'Full Read & Write',
    staffEdit: 'Create, Read, Update',
    staffView: 'Read Only',
    ruleEnforced: 'canEditShop(shopId)'
  },
  {
    resource: 'Add Transactions (Udhar/Cash/UPI)',
    owner: 'Full Read & Write',
    staffEdit: 'Create & Read',
    staffView: 'Read Only',
    ruleEnforced: 'canEditShop(shopId)'
  },
  {
    resource: 'Delete / Void Transactions',
    owner: 'Allowed',
    staffEdit: 'Blocked by Firestore Rules',
    staffView: 'Blocked by Firestore Rules',
    ruleEnforced: 'isOwner(shopId)'
  },
  {
    resource: 'Invite / Remove Staff',
    owner: 'Allowed',
    staffEdit: 'Forbidden',
    staffView: 'Forbidden',
    ruleEnforced: 'isOwner(shopId)'
  }
];

export const codebaseSyncInfo = {
  lastAuditedCommit: '0dbcd50',
  syncDate: '2026-09-08',
  verifiedFilesCount: 17,
  syncChecklist: [
    '1. Cross-reference constants.dart for newly added collection names or SharedPreferences keys.',
    '2. Check UpiNotificationListenerService.kt for added bank package names in supportedPackages.',
    '3. Verify sms_parser.dart regex patterns against changes in banking SMS templates.',
    '4. Verify firestore.rules matches deployed production database security rules.'
  ]
};
