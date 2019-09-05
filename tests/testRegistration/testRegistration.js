var companyRegistrationPage = require('../../pages/pageRegistration/pageCompanyRegistration.js');
var dataAddcompany = require('../../testdata/dataRegistration/dataCompanyRegistration.json');
var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var loginPage = require('../../pages/pageLogin/pageLogin.js');

describe('test signup functionality of newage', function() {

    var reqElement;

    beforeAll(function(){
		var testSpecName = "TestCompanyRegistration";
        efsLib.setApplicationUrl(loginPage, testSpecName);
        companyData = dataAddcompany.companyRegistration[0];
    });

    it('test_signup_1 : Clicking back on  Others tab should take to Charge Setup', function() {

        actionLib.browserRefresh();
        actionLib.verifyElementPresent(companyRegistrationPage.linkSignUp);
        actionLib.click(companyRegistrationPage.linkSignUp);
        companyRegistrationPage.signUpCompanyTab(companyData.company);
        actionLib.verifyElementPresent(companyRegistrationPage.iconLoginCreation);
        companyRegistrationPage.signUpLoginCreationTab(companyData.loginCreation);
        actionLib.verifyElementPresent(companyRegistrationPage.iconConfiguration);
        //when want to click uiSwitch then pass any string other than "none" in third attribute below
        companyRegistrationPage.signUpConfigurationTab(companyData.configuration);
        actionLib.verifyElementPresent(companyRegistrationPage.iconCustomerAgent);
        actionLib.click(companyRegistrationPage.buttonNextInCustAgentUpload);
        actionLib.verifyElementPresent(companyRegistrationPage.iconFinanceSetup);
        actionLib.click(companyRegistrationPage.buttonNextFinaceSetUp);
        actionLib.verifyElementPresent(companyRegistrationPage.iconChargeSetup);
        actionLib.click(companyRegistrationPage.buttonNextInChargeSetUp);
        actionLib.verifyElementPresent(companyRegistrationPage.iconOthers);
        actionLib.verifyElementPresent(companyRegistrationPage.buttonBack);
        actionLib.click(companyRegistrationPage.buttonBack);
        actionLib.verifyElementPresent(companyRegistrationPage.iconChargeSetup);
        actionLib.explicitWait(3000);

    });

    it('test_signup_2 : Clicking back on  Charge Setup tab should take to Finance Setup', function() {
        
        actionLib.verifyElementPresent(companyRegistrationPage.buttonBackInChargeSetUp);
        actionLib.click(companyRegistrationPage.buttonBackInChargeSetUp);
        actionLib.verifyElementPresent(companyRegistrationPage.iconFinanceSetup);
        actionLib.explicitWait(3000);
    });

    it('test_signup_3 : Clicking back on  Finance Setup tab should take to CustomerAgent Setup', function() {
        
        actionLib.verifyElementPresent(companyRegistrationPage.buttonBackFinaceSetUp);
        actionLib.click(companyRegistrationPage.buttonBackFinaceSetUp);
        actionLib.verifyElementPresent(companyRegistrationPage.iconCustomerAgent);
        actionLib.explicitWait(3000);
    });

    it('test_signup_4 : Clicking back on  CustomerAgent Setup tab should take to Configuration Setup', function() {
        
        actionLib.verifyElementPresent(companyRegistrationPage.buttonBackInCustAgentUpload);
        actionLib.click(companyRegistrationPage.buttonBackInCustAgentUpload);
        actionLib.verifyElementPresent(companyRegistrationPage.iconConfiguration);
        actionLib.explicitWait(3000);
    });

    it('test_signup_5 : Clicking back on  Configuration Setup tab should take to Login Setup', function() {
        
        actionLib.verifyElementPresent(companyRegistrationPage.buttonBackInConfiguration);
        actionLib.click(companyRegistrationPage.buttonBackInConfiguration);
        actionLib.verifyElementPresent(companyRegistrationPage.iconLoginCreation);
        actionLib.explicitWait(3000);
    });

    it('test_signup_6 : Clicking back on  Login Setup tab should take to Company Setup', function() {
        
        actionLib.verifyElementPresent(companyRegistrationPage.buttonBackInLoginCreation);
        actionLib.click(companyRegistrationPage.buttonBackInLoginCreation);
        actionLib.verifyElementPresent(companyRegistrationPage.passwordMandate);
        actionLib.setText(companyRegistrationPage.textBoxPassword, companyData.loginCreation.password);
        actionLib.setText(companyRegistrationPage.textBoxconfirmPassword, companyData.loginCreation.confirmPassword);
        actionLib.explicitWait(2000);       
        actionLib.click(companyRegistrationPage.buttonBackInLoginCreation);
        actionLib.verifyElementPresent(companyRegistrationPage.iconCompany);
        actionLib.explicitWait(3000);
    });

    it('test_signup_7 : should be able to provide details in company tab & navigate to next tab', function() {
    
        // actionLib.browserRefresh();
        // actionLib.verifyElementPresent(companyRegistrationPage.linkSignUp);
        // actionLib.click(companyRegistrationPage.linkSignUp);

       
        companyRegistrationPage.signUpCompanyTab(companyData.company);
        actionLib.verifyElementPresent(companyRegistrationPage.iconLoginCreation);
    });

    it('test_signup_8 : should be able to provide details in login creation tab & navigate to next tab', function() {
       
        companyRegistrationPage.signUpLoginCreationTab(companyData.loginCreation);
        actionLib.verifyElementPresent(companyRegistrationPage.iconConfiguration);
       
    });

    it('test_signup_9 : should be able to provide details in configuration tab  & navigate to next tab', function() {
    
        //when want to click uiSwitch then pass any string other than "none" in third attribute below
        companyRegistrationPage.signUpConfigurationTab(companyData.configuration);
        actionLib.verifyElementPresent(companyRegistrationPage.iconCustomerAgent);

    });

    it('test_signup_10 : shuld be able to provide details in customer Agento tab & navigate to next tab', function() {
        companyRegistrationPage.signUpCustomerUploadTab();
        actionLib.explicitWait(5000);
        reqElement = actionLib.getChainedElement(companyRegistrationPage.msgSuccessfulFileUpload, 
        companyRegistrationPage.strChildLocator);
        actionLib.verifyElementText("none", reqElement, "Customer data validated successfully");
        companyRegistrationPage.signUpAgentUploadTab();
        actionLib.explicitWait(5000);
        reqElement = actionLib.getChainedElement(companyRegistrationPage.msgSuccessfulFileUpload,
        companyRegistrationPage.strChildLocator);
        actionLib.verifyElementText("none", reqElement, "Agent data validated successfully");

    });

    it('test_signup_11 : should be able to provide details in finance setup tab  & navigate to next tab', function() {
        actionLib.click(companyRegistrationPage.buttonNextInCustAgentUpload);
        //when want to click uiSwitch then pass any string other than "none" in first two attributes below
        actionLib.verifyElementPresent(companyRegistrationPage.iconFinanceSetup);
        companyRegistrationPage.signUpFinanceSetupTab(companyData.financeSetUp);
     
    });

    it('test_signup_12 : should be able to provide details in charge setup tab & navigate to next tab', function() {
        actionLib.click(companyRegistrationPage.buttonNextFinaceSetUp);
        actionLib.verifyElementPresent(companyRegistrationPage.iconChargeSetup);
        companyRegistrationPage.signUpChargeSetupTab(companyData.chargeSetup);
        reqElement = actionLib.getChainedElement(companyRegistrationPage.msgSuccessfulFileUpload, 
        companyRegistrationPage.strChildLocator);
        actionLib.verifyElementText("none", reqElement, "Charge data uploaded successfully");
        actionLib.click(companyRegistrationPage.buttonNextInChargeSetUp);
        actionLib.verifyElementPresent(companyRegistrationPage.iconOthers);
    });

    it('test_signup_13 : should be able to provide details in Others tab', function() {

        actionLib.click(companyRegistrationPage.tabJobDateSetup);
        companyRegistrationPage.signUpJobDateSetupTab1(companyData.others);
        actionLib.explicitWait(5000);
        actionLib.click(companyRegistrationPage.tabAccountDocNumberSetup);
        companyRegistrationPage.signUpAccountingDocNumTab(companyData.others);
        actionLib.click(companyRegistrationPage.buttonFinish);
        actionLib.verifyElementText(companyRegistrationPage.textSignUpSuccessfulSubmission, "none", 
        "Your information has been submitted successfully");
        actionLib.verifyElementText(companyRegistrationPage.textSignUpEmailActivation, "none", 
        "Please check your email to activate your account");
    });
    
});