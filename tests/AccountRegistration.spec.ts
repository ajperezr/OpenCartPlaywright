/**
   Test Case: Account Registration
  
   Tags: @master @sanity @regression
  
   Steps:
   1) Navigate to application URL 
   2) Go to 'My Account' and click 'Register'
   3) Fill in registration details with random data
   4) Agree to Privacy Policy and submit the form
   5) Validate the confirmation message
*/

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

// Declare reusable variables
let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

// Playwright hook - runs before each test
test.beforeEach('Before Each', async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); // Navigate to application URL 
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
});

// Playwright hook - runs after each test (optional cleanup)
test.afterEach('After Each', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test('User Registration Test @master @sanity @regression', async () => {
    // Go to 'My Account' and click 'Register'
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    // Fill in registration details with random data
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password: string = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    // Validate the confirmation message
    const confirmationMsg: string = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');
});