var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');

var pageLogin = function () {

    this.textboxSaasid = by.model('loginDto.saasId');
    this.textboxUsername = by.id('userName');
    this.textboxPassword = by.id('Password');
    this.buttonSignin = by.xpath('//input[@class="btn btn-block"]');
    this.expandLogout = by.xpath('//b[@class="caret"]');
    this.linkLogout = by.xpath('//a[contains(text(),"Logout")]');
    this.saasIdErrorMessage = by.xpath("//form[@id='loginForm']//span[@class='ng-binding']");
    this.loginErrorMessage = by.xpath("//div[@class='message ng-binding']");
    this.iconLoginSuccess = by.xpath("//span[@class='hexagonCard ng-binding']");

    //SaasID
    this.setSaasId = function(strSaasId) {
       actionLib.setText(this.textboxSaasid,strSaasId); }
    //userName
    this.setuserName = function(strUsername) {
        actionLib.setText(this.textboxUsername,strUsername); }
    //Password
    this.setPassword = function(strPassword) {
        actionLib.setText(this.textboxPassword,strPassword); }
    //Click
    this.setClick =function() {
        actionLib.click(this.buttonSignin); }    

    //LoginFunction
    this.appLogin = function(strInput)  {
        actionLib.setText(this.textboxSaasid,strInput.SaasId);
        actionLib.setText(this.textboxUsername,strInput.username);
        actionLib.setText(this.textboxPassword,strInput.password);
        actionLib.click(this.buttonSignin); }  

    //Logout Function
    this.appLogout = function () {
            actionLib.verifyElementPresent(this.expandLogout);
            actionLib.click(this.expandLogout);
            actionLib.click(this.linkLogout);
            var EC = protractor.ExpectedConditions;
            // Wait for new page url to contain login
            browser.wait(EC.urlContains('login'), 30000);
            expect(browser.getCurrentUrl()).toContain('#/login'); }
};
module.exports = new pageLogin();
