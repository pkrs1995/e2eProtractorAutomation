var loginPage = require('../../pages/pageLogin/pageLogin.js');
var customerCommonElementPage = require('../../pages/pageAddCustomer/pageAddCustomer.js');
var loginData = require('../../testdata/dataLogin/dataLogin.json');
var customerData = require('../../testdata/dataAddCustomer/dataCustomer.json');
var globalData = require('../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../library/action.js');
var efsLib = require('../../library/appspecificactions.js');
var hamberger = require('../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../pages/pageNavigation/topBar.js');
var addCustomerData = require('../../testdata/masters/eCRM/customer/customer.json');

describe('test add customer functionality of newage', function() {
    var dataAddCutomer;
     
    beforeAll(function(){
       //customer name declared in global data as same will be used in enquiry/quotation etc workflows
       // globalData.customerName = customerData.name + actionLib.getTodayTime(); // handeled in page itself
        //globalData.globalData.customerName =customerCommonElementPage.commonCustomer;
        console.log("Added Customer Name: " +  globalData.globalData.customerName);
        var testSpecName = "TestAddCustomer";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataAddCutomer = addCustomerData.addCustomer[0];
    });

    it('test_addcustomer_1 : should be able to navigate to add customer page', function() {

        // customerCommonElementPage.navigateToAddCustomerPage();
        hamberger.navigateToPage("Masters", "eCRM", "Customer");
        actionLib.click(customerCommonElementPage.btnAddCustomer);
        customerCommonElementPage.addExportCustomer(dataAddCutomer.customer)
    });
	
    it('test_addcustomer_2 : should be able to add customer details on address tab', function() {
        
        customerCommonElementPage.addCustomerAddress(dataAddCutomer.address);
    });

    it('test_addcustomer_3 : should be able to add customer details on more info tab', function() {

       actionLib.scrollToElement(customerCommonElementPage.dropDownName);
       actionLib.verifyElementPresent(customerCommonElementPage.tabMoreInfo);
       actionLib.click(customerCommonElementPage.tabMoreInfo);
       actionLib.verifyElementPresent(customerCommonElementPage.textCustomerType);

       //-- Below mentioned nos. cannot be used again if used once. so for testing
       //making these values as per combination of current hour, min and sec.
    //    var iataCode = actionLib.getTodayTime();
    //    var vatNumber = actionLib.getTodayTime();
    //    var PanNumber = actionLib.getTodayTime();
    //    var svtRegnNumber = actionLib.getTodayTime(); // handeled in page itself
    //    var tinNumber = actionLib.getTodayTime();
    //    var racNum = actionLib.getTodayTime();
    //    var accountNum = actionLib.getTodayTime();
    //    var personalIdNum = actionLib.getTodayTime();
    //    var tsaRegistrationNum = actionLib.getTodayTime();
    //    var spotNum = actionLib.getTodayTime();

       //--Customer checkbox is checked by-default, so unchecked first so a new Customer Type can be selected
    //    customerCommonElementPage.fillCustomerType(customerMoreInfoData.disableCustomerType);
       //--if remove below line (add agent customer), then make iataCode variable as "none"
       customerCommonElementPage.fillCustomerType(dataAddCutomer.moreInfo.agentCustomerType);
       customerCommonElementPage.addCustomerMoreInfo(dataAddCutomer.moreInfo);
    });

    it('test_addcustomer_4 : should be able to add customer details on contact tab', function() {
        
        actionLib.scrollToElement(customerCommonElementPage.tabContact);
        actionLib.click(customerCommonElementPage.tabContact);
        actionLib.verifyElementPresent(customerCommonElementPage.textBoxFirstName);
        
        customerCommonElementPage.addCustomerContactOfficial(dataAddCutomer.contactOfficial);
        
        actionLib.click(customerCommonElementPage.tabPersonalInfo);
        actionLib.verifyElementPresent(customerCommonElementPage.textAreaPersonalAddress);
        //--9th attribute is to Add Relation, if this attribute is none then make all the following attributes
        //also none 
        // reqElement = actionLib.getTodayDate();
        customerCommonElementPage.addCustomerContactPersonal(dataAddCutomer.contactPersonal);
        
        actionLib.click(customerCommonElementPage.tabRemarks);
        actionLib.verifyElementPresent(customerCommonElementPage.textAreaRemarks);
        customerCommonElementPage.addCustomerContactRemarks(dataAddCutomer.contactRemarks);
    });

    it('test_addcustomer_5 : should be able to add customer details on service & division tab', function() {
        
        actionLib.scrollToElement(customerCommonElementPage.tabServiceDivision);
        actionLib.verifyElementPresent(customerCommonElementPage.tabServiceDivision);
        actionLib.click(customerCommonElementPage.tabServiceDivision);
        actionLib.verifyElementPresent(customerCommonElementPage.dropDownLocationInService);

        customerCommonElementPage.addCustomerServiceDivision(dataAddCutomer.serviceDivision);
    });

    it('test_addcustomer_6 : should be able to add customer details on accounts tab', function() {
        
        actionLib.scrollToElement(customerCommonElementPage.tabAccounts);
        actionLib.verifyElementPresent(customerCommonElementPage.tabAccounts);
        actionLib.click(customerCommonElementPage.tabAccounts);
        actionLib.verifyElementPresent(customerCommonElementPage.dropDownPaymentSchedule);
        // var cstNumber = actionLib.getTodayTime();
        
        customerCommonElementPage.addCustomerAccounts(dataAddCutomer.account);
    });

    it('test_addcustomer_7 : should be able to add customer details on credit tab', function() {
        
        actionLib.scrollToElement(customerCommonElementPage.tabCredit);
        actionLib.verifyElementPresent(customerCommonElementPage.tabCredit);
        actionLib.click(customerCommonElementPage.tabCredit);
        actionLib.verifyElementPresent(customerCommonElementPage.dropDownLocationInCredit);

        customerCommonElementPage.addCustomerCredit(dataAddCutomer.credit);
    });

    it('test_addcustomer_8 : should be able to add customer details on email tab', function() {
        
        actionLib.scrollToElement(customerCommonElementPage.tabEmail);
        actionLib.verifyElementPresent(customerCommonElementPage.tabEmail);
        actionLib.click(customerCommonElementPage.tabEmail);
        actionLib.verifyElementPresent(customerCommonElementPage.textBoxEmailInEmail);

        customerCommonElementPage.addCustomerEmail(dataAddCutomer.email);
    });

    it('test_addcustomer_9 : should be able to add customer details on profiles tab', function() {
        
        actionLib.scrollToElement(customerCommonElementPage.tabProfiles);
        actionLib.verifyElementPresent(customerCommonElementPage.tabProfiles);
        actionLib.click(customerCommonElementPage.tabProfiles);
        actionLib.verifyElementPresent(customerCommonElementPage.dropDownServiceInProfile);

        customerCommonElementPage.addCustomerProfiles(dataAddCutomer.profiles);
    });

    it('test_addcustomer_10 : verify that customer is added successfully', function() {
        
        actionLib.verifyElementPresent(customerCommonElementPage.btnSave);
        actionLib.click(customerCommonElementPage.btnSave);
        actionLib.verifyElementPresent(customerCommonElementPage.btnPopUpOk);
        actionLib.click(customerCommonElementPage.btnPopUpOk);
        // actionLib.verifyElementPresent(customerCommonElementPage.btnCancel); // no need 
        // actionLib.click(customerCommonElementPage.btnCancel);
        efsLib.fillTextInTableColumn(dataAddCutomer.customer.customerTableDataXpathTag, 2, 2, globalData.globalData.customerName);
        efsLib.verifySearchTextInTableRowCol(dataAddCutomer.customer.customerTableDataXpathTag, 1, 2, globalData.globalData.customerName);
        efsLib.verifySearchTextInTableRowCol(dataAddCutomer.customer.customerTableDataXpathTag, 1, 4, dataAddCutomer.customer.country);
    });

    afterAll(function(){
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});
