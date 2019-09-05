var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var enquiryPage = require('../../../pages/pageAirImport/pageEnquiry/pageAddEnquiry.js');
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

        it('test_addimportenquiry_1 : should be able to navigate to add enquiry page', function() {
                actionLib.verifyElementPresent(enquiryPage.btnAddEnquiry);
                //----second attribute value none - get the enquiry count on the my task page
                actionLib.verifyElementPresent(enquiryPage.linkEnquiry);
                actionLib.verifySplitCountOfLocator(enquiryPage.linkEnquiry, "none");
        
                enquiryPage.navigateToAddEnquiryPage();
                actionLib.verifyElementPresent(enquiryPage.dropDownCustomer);
        });
        

        it('test_addimportenquiry_2 : should be able to add enquiry new service tab', function() {

                enquiryPage.addEnquiryCustomer();
                enquiryPage.addEnquiry(dataEnquiry.enquiry);
        });

        it('test_addimportenquiry_3 : should be able to add enquiry dimensions section', function() {

                actionLib.click(enquiryPage.expandDimensionsSection);
                actionLib.verifyElementPresent(enquiryPage.textBoxNoOfPieces);
                enquiryPage.addEnquiryDimensions(dataEnquiry.dimensions);
                actionLib.click(enquiryPage.expandDimensionsSection);
        });

        // -- This test case is commented as the shipment active count on my task page is not getting updated
        // if data is added in pick up
        // it('test_addimportenquiry_4 : should be able to add enquiry pick up / delivery section', function() {

        //         actionLib.click(enquiryPage.expandPickUpDeliverySection);
        //         actionLib.verifyElementPresent(enquiryPage.textBoxPickUpAddress1);
        //         enquiryPage.addEnquiryPickUpDelivery(dataEnquiry.pickUpDelivery);
        //         actionLib.click(enquiryPage.expandPickUpDeliverySection);
        // });
 
        it('test_addimportenquiry_5 : should be able to add enquiry rate request section', function() {
            
                actionLib.click(enquiryPage.expandRateRequestSection);
                actionLib.verifyElementPresent(enquiryPage.dropDownVendor);
                //-- if 5th attribute is none (as it opens a new window) then make the attributes following it also none
                //-- Added 1 charge under charge detail pop up as final attribute is selected as yes
                enquiryPage.addEnquiryRateRequest(dataEnquiry.rateRequest);
                actionLib.click(enquiryPage.btnChargeDetailSave);
                actionLib.verifyElementPresent(enquiryPage.expandRateRequestSection);
                actionLib.click(enquiryPage.expandRateRequestSection);
        });
  
        it('test_addimportenquiry_6 : should be able to save enquiry successfully', function() {

                actionLib.verifyElementPresent(enquiryPage.btnSave);
                actionLib.click(enquiryPage.btnSave);
                actionLib.click(enquiryPage.btnPopUpOk);
                actionLib.click(actionLib.menuTasks);
                actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
                actionLib.click(actionLib.subMenuMyTasks);
                actionLib.verifyElementPresent(enquiryPage.linkEnquiry);
                // --second attribute value other than none - get the enquiry count on the my task page
                // and verify it is 1 more than the previous enquiry count.
                actionLib.verifySplitCountOfLocator(enquiryPage.linkEnquiry, "Yes");//--count probelm
        });

        it('test_addimportenquiry_7 : verify added enquiry few data values', function() {

                actionLib.click(enquiryPage.linkEnquiry);
                efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryTableDataXpathTag, 2, 2, globalData.globalData.importCustomerName)
                efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiry.enquiryTableDataXpathTag, 1, 2, globalData.globalData.importCustomerName);
                efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiry.enquiryTableDataXpathTag, 1, 4, strEnquiryReceived);
                efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiry.enquiryTableDataXpathTag, 1, 5, strQuoteByDate);
                efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiry.enquiryTableDataXpathTag, 1, 7, dataEnquiry.enquiry.origin);
                efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiry.enquiryTableDataXpathTag, 1, 8, dataEnquiry.enquiry.destination);
        });

    afterAll(function(){
        console.log('Logout action called.....');   
        // loginPage.appLogout();
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
}); 
