const {Builder, By} = require('selenium-webdriver');
const DashboardPage = require ('./WebComponent/DashboardPage');
const ProductPage = require ('./WebComponent/ProductPage');

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 13 [Verify Quantity Product]', function(){
    this.timeout(60000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            // matikan headless jika ingin melihat progress setiap test
            // options.addArguments('--headless');
        break;
    }
    
    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        } 
        await dashboardPage.loginMenu();
        await dashboardPage.login(email, password);
        await dashboardPage.homePage();
    });
    it('Verify Products Page', async function () {
        const productPage = new ProductPage(driver);
        await productPage.viewProductBtn();
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, `${baseURL}/product_details/1`, 'URL does not match');
        await productPage.inputQuantity();
        await productPage.addToCartBtn();
        // tambahkan delay 2 detik agar bisa memunculkan alert
        await new Promise(resolve => setTimeout(resolve, 2000));
        await productPage.viewCartBtn();
        const isQuantityDisplayed = await productPage.checkQuantity();
        if (isQuantityDisplayed == "4") {
            console.log("Product quantity is 4.");
        } else {
            console.log("Product quantity isn't 4.");
        }
    });

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});