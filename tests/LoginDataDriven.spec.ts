import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

// Load JSON test data logindata.json
const jsonPath: string = "testdata/logindata.json";
const jsonTestData: any = DataProvider.getTestDataFromJson(jsonPath);
for (const data of jsonTestData) {
    test(`Login Test with JSON Data: ${data.testName} @datadriven`, async({ page }) => {
        const config: TestConfig = new TestConfig(); // Create instance
        await page.goto(config.appUrl);              // Getting appURL from test.config.ts file

        const homePage: HomePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if (data.expected.toLowerCase() === 'success') {
            const myAccountPage: MyAccountPage = new MyAccountPage(page);
            const isLoggedIn: boolean = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        }
        else {
            const errorMessage: string | null = await loginPage.getloginErrorMessage();
            //expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
            expect(errorMessage).toContain('Warning: No match');
        }
    });
}

// Load CSV test data logindata.json
const csvPath: string = "testdata/logindata.csv";
const csvTestData: any = DataProvider.getTestDataFromCsv(csvPath);
for (const data of csvTestData) {
    test(`Login Test with CSV Data: ${data.testName} @datadriven`, async({ page }) => {
        const config: TestConfig = new TestConfig(); // Create instance
        await page.goto(config.appUrl);              // Getting appURL from test.config.ts file

        const homePage: HomePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if (data.expected.toLowerCase() === 'success') {
            const myAccountPage: MyAccountPage = new MyAccountPage(page);
            const isLoggedIn: boolean = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        }
        else {
            const errorMessage: string | null = await loginPage.getloginErrorMessage();
            //expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
            expect(errorMessage).toContain('Warning: No match');    
        }
    });
}