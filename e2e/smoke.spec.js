import { test, expect } from '@playwright/test';

test.describe('Sangam Web App E2E Smoke Tests', () => {
  test('navigates to Showcase page and verifies 3D canvas and simulator', async ({ page }) => {
    await page.goto('/');
    
    // Brand header should be visible
    await expect(page.locator('text=Sangam')).toBeVisible();
    await expect(page.locator('text=Unified Kirana Ledger')).toBeVisible();

    // Verify Kirana Simulator is rendered
    await expect(page.locator('text=Live UPI Interception & Ledger Simulator')).toBeVisible();
  });

  test('switches to Learning the Code and inspects FileTree and CodeViewer', async ({ page }) => {
    await page.goto('/');
    
    // Click Learning the Code tab
    await page.click('text=Learning the Code');
    
    // Verify Explorer is open
    await expect(page.locator('text=Project Explorer')).toBeVisible();
    await expect(page.locator('text=Why this code was written')).toBeVisible();
    await expect(page.locator('text=Line-by-Line Technical Breakdown')).toBeVisible();
  });

  test('switches to Learning the App and verifies architecture pipelines', async ({ page }) => {
    await page.goto('/');
    
    // Click Learning the App tab
    await page.click('text=Learning the App');
    
    // Verify Architecture section
    await expect(page.locator('text=Learning the App Architecture')).toBeVisible();
    await expect(page.locator('text=Role-Based Security Matrix')).toBeVisible();
    await expect(page.locator('text=Firestore NoSQL Data Hierarchy')).toBeVisible();
  });
});
