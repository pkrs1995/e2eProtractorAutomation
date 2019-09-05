var companyRegistrationPage = require('../../pages/pageRegistration/pageCompanyRegistration.js');
var dataAddcompany = require('../../testdata/dataRegistration/dataCompanyRegistration.json');
var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var loginPage = require('../../pages/pageLogin/pageLogin.js');

describe('test company tab on registration screen', function() {

    beforeAll(function(){
		var testSpecName = "TestCompanyRegistration";
        efsLib.setApplicationUrl(loginPage, testSpecName);
        companyData = dataAddcompany.companyRegistration[0];
    });


    it('test_signup_0 : should be able to go back to login page, if user clicks on browser back button on company tab', function() {
        actionLib.verifyElementPresent(companyRegistrationPage.linkSignUp);
        actionLib.click(companyRegistrationPage.linkSignUp);
        actionLib.verifyElementPresent(companyRegistrationPage.textBoxFirstName);

        actionLib.explicitWait(2000);
        browser.navigate().back();
        actionLib.verifyElementPresent(loginPage.textboxSaasid);
    });

    it('test_companytab_1 : user receives error message when click next button with empty first name field', 
    function() {
      
        actionLib.verifyElementPresent(companyRegistrationPage.linkSignUp);
        actionLib.click(companyRegistrationPage.linkSignUp);
        companyRegistrationPage.firstNamefieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("First name is mandatory");
    });

    it('test_companytab_2 : user receives error message when click next button with empty last name field', 
    function() {
        
        actionLib.browserRefresh();
        companyRegistrationPage.lastNamefieldVerfication(companyData.company)
        companyRegistrationPage.fieldGetErrorTextMessage("Last name is mandatory");
    });

    it('test_companytab_3 : user receives error message when click next button with empty email field', 
    function() {
        
        actionLib.browserRefresh();
        companyRegistrationPage.emailfieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("eMail is mandatory");
    });

    it('test_companytab_4 : user receives error message when click next button with empty country field', 
    function() {
        
        actionLib.browserRefresh();
        companyRegistrationPage.countryfieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("Country is mandatory");
    });

    it('test_companytab_5 : user receives error message when click next button with empty phone number field', 
    function() {
        
        actionLib.browserRefresh();
        companyRegistrationPage.phoneNumberfieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("Phone Number is mandatory");
    });

    it('test_companytab_6 : user receives error message when click next button with empty company name field', 
    function() {
        
        actionLib.browserRefresh();
        companyRegistrationPage.companyNamefieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("Company Name is mandatory");
    });

    it('test_companytab_7 : user receives error message when click next button with empty address 1 field', 
    function() {

        actionLib.browserRefresh();
        companyRegistrationPage.address1fieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("Address 1 is mandatory");
    });

    it('test_companytab_8 : user receives error message when click next button with empty area field', 
    function() {

        actionLib.browserRefresh();
        companyRegistrationPage.areafieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("Area is mandatory");
    });

    it('test_companytab_9 : user receives error message when click next button with empty city field', 
    function() {

        actionLib.browserRefresh();
        companyRegistrationPage.cityfieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("City is mandatory");
    });

    it('test_companytab_10 : user receives error message when click next button with empty time zone field', 
    function() {

        actionLib.browserRefresh();
        companyRegistrationPage.timeZonefieldVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("Timezone is mandatory");
    });

    it('test_companytab_11 : user receives error message when click next button with existing company name field', 
    function() {
        
        actionLib.browserRefresh();
        companyRegistrationPage.existingCompanyNameVerfication(companyData.company);
        companyRegistrationPage.fieldGetErrorTextMessage("This company name is already registered with us!");
    });

    
});

