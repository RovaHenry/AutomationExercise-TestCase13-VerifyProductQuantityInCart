const {By} = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.logoDisplay = By.css("[alt='Website for automation practice']");
        this.loginMenuButton = By.css("[href='/login']");
        this.loginbutton = By.css("[data-qa='login-button']");
        this.emailFill = By.css("[data-qa='login-email']");
        this.passwordFill = By.css("[name='password']");
        this.home = By.css(".navbar-nav [href='/']");
    }
    async navigate(baseURL){
        await this.driver.get(baseURL);
    }

    async verifyLogoHome() {
        const logo = await this.driver.findElement(this.logoDisplay);
        return logo;
    }
    async loginMenu() {
        await this.driver.findElement(this.loginMenuButton).click();
    }
    async login(email, password) {
        await this.driver.findElement(this.emailFill).sendKeys(email);
        await this.driver.findElement(this.passwordFill).sendKeys(password);
        await this.driver.findElement(this.loginbutton).click();
    }
    async homePage() {
        await this.driver.findElement(this.home).click();
    }
}

module.exports = DashboardPage;