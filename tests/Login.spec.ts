/**
   Test Case: Login with Valid Credentials
  
   Tags: @master @sanity @regression
  
   Steps:
   1) Navigate to the application URL
   2) Navigate to Login page via Home page
   3) Enter valid credentials and log in
   4) Verify successful login by checking 'My Account' page presence
*/

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

// Declare reusable variables
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

// Playwright hook - runs before each test
test.beforeEach('Before Each', async ({ page }) => {
    config = new TestConfig(); // Load config (URL, credentials)
    await page.goto(config.appUrl); // Navigate to base URL

    // Initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
});

// Playwright hook - runs after each test (optional cleanup)
test.afterEach('After Each', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close(); // Close browser tab (good practice in local/dev run)
});

test('User login test @master @sanity @regression', async () => {
    // Navigate to Login page via Home page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    // Enter valid credentials and log in
    //await loginPage.setEmail(config.email);
    //await loginPage.setPassword(config.password);
    //await loginPage.clickLogin();

    // Alternatively
    await loginPage.login(config.email, config.password);

    // Verify successful login by checking 'My Account' page presence
    const isLoggedIn: boolean = await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();
});