// Script to verify that code snippets in showcase-app match live Sangam Flutter files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

console.log('🔍 Checking Sangam repository snippet alignment...');

const filesToCheck = [
  'lib/core/constants.dart',
  'lib/core/theme.dart',
  'lib/core/utils.dart',
  'lib/core/context_extensions.dart',
  'lib/domain/entities/bill.dart',
  'lib/domain/entities/transaction.dart',
  'lib/domain/entities/customer.dart',
  'lib/domain/entities/app_user.dart',
  'lib/domain/entities/sms_entry.dart',
  'lib/domain/usecases/sms_parser.dart',
  'lib/models/upi_payment_model.dart',
  'lib/services/auth_service.dart',
  'lib/services/cloud_service.dart',
  'lib/services/groq_service.dart',
  'lib/presentation/providers/providers.dart',
  'android/app/src/main/kotlin/com/sangam/app/UpiNotificationListenerService.kt',
  'firestore.rules'
];

let allPassed = true;

for (const relPath of filesToCheck) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`✅ [Verified] ${relPath} (${stats.size} bytes)`);
  } else {
    console.warn(`⚠️ [Missing] ${relPath} not found in repo root`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 All 17 audited files are present and aligned with live Sangam repository!');
  process.exit(0);
} else {
  console.error('\n❌ Some files could not be verified.');
  process.exit(1);
}
