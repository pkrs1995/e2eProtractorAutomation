var loginPage = require('../../pages/pageLogin/pageLogin.js');
var loginData = require('../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../library/action.js');
var efsLib = require('../../library/appspecificactions.js');

describe('test login functionality of newage', function() {

    beforeAll(function(){
        
        var testSpecName = "TestLogin";
        efsLib.setApplicationUrl(loginPage, testSpecName);
    });

    it('test_login_1 : should not be able to login with invalid saasid : SecondData ', function() {
        
        loginPage.appLogin(loginData.loginPage.SecondData);
        actionLib.verifyElementText(loginPage.saasIdErrorMessage, 'none', 'Invalid SaaS Id');
    });

    it('test_login_2 : should not be able to login with invalid username : ThirdData', function() {
        
        loginPage.appLogin(loginData.loginPage.ThirdData);
        actionLib.verifyElementText(loginPage.loginErrorMessage, 'none', 'Provided Username or Password is not correct.');
    });


    it('test_login_3 : should not be able to login with invalid password : ThirdData', function() {
        
        loginPage.appLogin(loginData.loginPage.ThirdData);
        actionLib.verifyElementText(loginPage.loginErrorMessage, 'none', 'Provided Username or Password is not correct.');
    });
    

    it('test_login_4 : should not be able to login with invalid username and password: FourthData ', function() {
        
        loginPage.appLogin(loginData.loginPage.FourthData);
        actionLib.verifyElementText(loginPage.loginErrorMessage, 'none', 'Provided Username or Password is not correct.');
    });

    it('test_login_5 : should be able to login with valid credentials: FirstData', function(){
        loginPage.appLogin(loginData.loginPage.FirstData);
        actionLib.verifyElementPresent(loginPage.iconLoginSuccess);
        loginPage.appLogout();
    });

    it('test_login_6 : Checkfocus for Saas ID: FirstData', function() {  
        loginPage.setSaasId(loginData.loginPage.FirstData.SaasId);
        expect(element(loginPage.textboxSaasid).getAttribute('id')).toEqual(browser.driver.switchTo().activeElement().getAttribute('id'));
    });
});
