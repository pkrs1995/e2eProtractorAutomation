var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var enquiryPage = require('../../../pages/pageAirImport/pageEnquiry/pageAddEnquiry.js');
var enquiryPagelist = require('../../../pages/pageAirImport/pageEnquiry/pageEnquiry.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirImport/dataEnquiry/dataEnquiry.json');
var hamberger = require('../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../pages/pageNavigation/topBar.js');
var customerCommonElementPage = require('../../../pages/pageAddCustomer/pageAddCustomer.js');
var addCustomerData = require('../../../testdata/masters/eCRM/customer/customer.json');

describe('test import add enquiry functionality of newage', function() {
    var dataEnquiry;
    var dataAddCutomer;
    var strEnquiryReceived= actionLib.getTodayDate();
    var  strQuoteByDate=actionLib.getTodayDate();

beforeAll(function(){
    
           var testSpecName = "Import TestAddEnquiry";
           efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
           dataEnquiry=enquiryData.addEnquiry[0];
           dataAddCutomer = addCustomerData.addCustomer[0];
    });

    it('test_addimportenquiry_1: verify user able to create temporary customer in enquiry page', function() {
               
            hamberger.navigateToPage("Sales","Enquiry");
            enquiryPage.customericon();
            enquiryPage.addEnquiryCustomerIcon(dataEnquiry.addNewCustomerDetails); 
    });

    it('test_addimportenquiry_2: user not able to create a quotation without convertTo Customer ', function() {
            
            actionLib.click(enquiryPage.btnCreateQuotation);
            var errorCustomerMessage = actionLib.getTextByLocator(enquiryPage.errorMessageCustomerIcon);
            expect(errorCustomerMessage).toEqual("This enquiry is not created with the customer, create a customer before creating quotation");
    });

    it('test_addimportenquiry_3:  user can able to convert into customer from enquiry screen' , function() {

            enquiryPage.convertToCustomer();
    });

    it('test_addimportenquiry_4 : should able to check the value added service charges in Quotation screen', function()  {
            
            enquiryPage.vasCheckbox();
    });
            
    it('test_addimportenquiry_5 : verify user should able create a customer through Add New Customer option', function() {
            
            actionLib.click(enquiryPage.btnEnquiry);
            enquiryPage.addNewCustomer();
            customerCommonElementPage.addImportCustomer(dataAddCutomer.customer);
            customerCommonElementPage.addCustomerAddress(dataAddCutomer.address);
            actionLib.click(customerCommonElementPage.btnSave);
            actionLib.click(customerCommonElementPage.btnPopUpOk);
            enquiryPage.addEnquiry(dataEnquiry.enquiry);
            actionLib.verifyElementPresent(enquiryPage.btnSave);
            actionLib.click(enquiryPage.btnSave);
            actionLib.click(enquiryPage.btnPopUpOk);
    }); 

    it('test_addimportenquiry_6 : verify user should able to cancel the enquiry', function() {
        
            enquiryPage.cancelEnquiry();
    });
 
    it('test_addimportenquiry_7 : user not able to save the record without fill customer details in customericon', function() {
           
            actionLib.click(enquiryPage.backtoEnquiryList); 
            enquiryPage.customericon(); 
            enquiryPage.addEnquiry(dataEnquiry.enquiry);  
            actionLib.click(enquiryPage.btnSave);
            var customerErrorMessage = actionLib.getTextByLocator(enquiryPage.customerErrorMessage);
            expect(customerErrorMessage).toEqual("Customer Information is not provided..");
    });

    it('test_addimportenquiry_8 : verify that count of records display in all the tabs on enquiry page', function() {

            actionLib.click(enquiryPage.btnCancel);
            enquiryPagelist.verifyCountinEnquiryPage();
    });
    
    afterAll(function(){
            console.log('Logout action called.....');   
            // loginPage.appLogout();
            topBar.appLogout();
            console.log('Logout action finished.....');
    });

});