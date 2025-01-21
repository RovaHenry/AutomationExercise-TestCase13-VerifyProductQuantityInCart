const {By} = require('selenium-webdriver');

class ProductPage {
    constructor(driver) {
        this.driver = driver;
        this.viewProduct = By.css("[href='/product_details/1']");
        this.quantityInput = By.css("#quantity");
        this.addCart = By.css(".cart");
        this.viewCart = By.css("u");
        this.quantityCheck = By.css(".disabled");
    }
    async viewProductBtn() {
        await this.driver.findElement(this.viewProduct).click();
    }
    async inputQuantity() {
        await this.driver.findElement(this.quantityInput).clear();
        await this.driver.findElement(this.quantityInput).sendKeys("4");
    }
    async addToCartBtn() {
        await this.driver.findElement(this.addCart).click();
    }
    async viewCartBtn() {
        await this.driver.findElement(this.viewCart).click();
    }
    async checkQuantity() {
        const quantity = await this.driver.findElement(this.quantityCheck).getText();
        return quantity;
    }
}

module.exports = ProductPage;