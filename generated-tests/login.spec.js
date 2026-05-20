const { test, expect } = require('@playwright/test');

test.describe('Login Form Tests', () => {

  test('Login form submission - positive', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    await usernameInput.fill('validUser');
    await passwordInput.fill('validPassword123');
    await submitButton.click();

    await expect(page).toHaveURL(/.*dashboard|.*home/);
  });

  test('Login form submission with only username - negative', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    await usernameInput.fill('validUser');
    await passwordInput.fill('');
    await submitButton.click();

    const errorMessage = page.locator('.error:has-text("password is required")');
    await expect(errorMessage).toBeVisible();
  });

  test('Login form submission with only password - negative', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    await usernameInput.fill('');
    await passwordInput.fill('validPassword123');
    await submitButton.click();

    const errorMessage = page.locator('.error:has-text("username is required")');
    await expect(errorMessage).toBeVisible();
  });

  test('Login form submission with empty username and password - negative', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    await usernameInput.fill('');
    await passwordInput.fill('');
    await submitButton.click();

    const usernameError = page.locator('.error:has-text("username is required")');
    const passwordError = page.locator('.error:has-text("password is required")');
    await expect(usernameError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('Login form submission with invalid username format - negative', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    await usernameInput.fill('invalid user!');
    await passwordInput.fill('validPassword123');
    await submitButton.click();

    const errorMessage = page.locator('.error:has-text("invalid username format")');
    await expect(errorMessage).toBeVisible();
  });

  test('Login form submission with incorrect password - negative', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    await usernameInput.fill('validUser');
    await passwordInput.fill('wrongPassword');
    await submitButton.click();

    const errorMessage = page.locator('.error:has-text("incorrect password")');
    await expect(errorMessage).toBeVisible();
  });

  test('Login form submission with maximum length input values - edge', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const maxUsername = 'a'.repeat(256);
    const maxPassword = 'p'.repeat(256);
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');

    await usernameInput.fill(maxUsername);
    await passwordInput.fill(maxPassword);
    await submitButton.click();

    // Either successful login or validation error
    const errorMessages = page.locator('.error');
    if (await errorMessages.count() > 0) {
      for (let i = 0; i < await errorMessages.count(); i++) {
        await expect(errorMessages.nth(i)).toBeVisible();
      }
    } else {
      await expect(page).toHaveURL(/.*dashboard|.*home/);
    }
  });

});

test.describe('Navigation Menu Tests', () => {

  test('Navigation menu toggle - positive', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const toggleButton = page.locator('#toggle-navigation');

    await toggleButton.click();

    const navigationMenu = page.locator('#navigation-menu');
    await expect(navigationMenu).toBeVisible();
  });

  test('Navigation menu toggle multiple clicks - edge', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const toggleButton = page.locator('#toggle-navigation');
    const navigationMenu = page.locator('#navigation-menu');

    for (let i = 0; i < 4; i++) {
      await toggleButton.click();
      const visible = await navigationMenu.isVisible();
      await expect(visible).toBe(i % 2 === 0);
    }
  });

});

test.describe('Form Edge Cases Tests', () => {

  test('Submit button with empty text and no id - edge', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const submitButtons = page.locator('button[type="submit"]');
    let clickAttempted = false;

    for (let i = 0; i < await submitButtons.count(); i++) {
      const btn = submitButtons.nth(i);
      const id = await btn.getAttribute('id');
      const text = (await btn.textContent()).trim();
      if (!id && !text) {
        // Button with empty id and empty text found
        clickAttempted = true;
        await btn.click().catch(() => {});
        break;
      }
    }
    expect(clickAttempted).toBe(true);
  });

  test('Input fields with empty placeholder - edge', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');

    await usernameInput.fill('testUser');
    await passwordInput.fill('testPass');

    await expect(usernameInput).toHaveValue('testUser');
    await expect(passwordInput).toHaveValue('testPass');
  });

});

test.describe('Links Presence and Visibility', () => {

  test('All links text presence and visibility - positive', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    const expectedLinksTexts = [
      'Press "Enter" to skip to content',
      'Home',
      'Practice',
      'Courses',
      'Blog',
      'Contact',
      'Practice Test Automation.',
      'Privacy Policy'
    ];

    for (const text of expectedLinksTexts) {
      const link = page.locator(`a:has-text("${text}")`);
      await expect(link).toBeVisible();
    }

    // Verify no empty text links are visible
    const emptyTextLinks = page.locator('a', { hasText: ''});
    for (let i = 0; i < await emptyTextLinks.count(); i++) {
      const link = emptyTextLinks.nth(i);
      const text = (await link.textContent()).trim();
      expect(text).not.toBe('');
    }
  });

});