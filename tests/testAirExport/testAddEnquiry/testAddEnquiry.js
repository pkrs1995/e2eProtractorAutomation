var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var enquiryPage = require('../../../pages/pageAirExport/pageEnquiry/pageEnquiry.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');
//var enquirydata = require('../../../testdata/sales/enquiry/enquiry.json');


describe('test export add enquiry functionality of newage', function () {
    
    var strEnquiryReceived;
    var strQuoteByDate;
    var attachmentUpload = "../testdata/dataFiles/agentTemplate.xlsx";
    var dataEnquiry;

    beforeAll(function(){

        var testSpecName = "TestAddEnquiry";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry=enquiryData.addEnquiry[0];
    });  

        it('test_addexportenquiry_1 : should be able to navigate to add enquiry page', function () {
            
            actionLib.verifyElementPresent(enquiryPage.btnAddEnquiry);
            //second attribute value none - get the enquiry count on the my task page
            actionLib.verifyElementPresent(enquiryPage.linkEnquiry);
            actionLib.verifySplitCountOfLocator(enquiryPage.linkEnquiry, "none");
            enquiryPage.navigateToAddEnquiryPage();
            actionLib.verifyElementPresent(enquiryPage.dropDownCustomer);
        });

        it('test_addexportenquiry_2 : should be able to add enquiry new service tab', function () {

            strEnquiryReceived = actionLib.getTodayDate();
            strQuoteByDate = actionLib.getTodayDate();
            enquiryPage.addEnquiry(dataEnquiry.enquiry);
        });

        it('test_addexportenquiry_3 : should be able to add enquiry dimensions section', function () {
            
            actionLib.click(enquiryPage.expandDimensionsSection);
            actionLib.verifyElementPresent(enquiryPage.textBoxNoOfPieces);
            enquiryPage.addEnquiryDimensions(dataEnquiry.dimensions);
            actionLib.click(enquiryPage.btnAddDimension);
            enquiryPage.addEnquiryDimensions1(dataEnquiry.dimensions);
            actionLib.click(enquiryPage.expandDimensionsSection);
        });
        // -- This test case is commented as the shipment active count on my task page is not getting updated
        // if data is added in pick up
        // it('test_addenquiry_4 : should be able to add enquiry pick up / delivery section', function() {
        //     actionLib.click(enquiryPage.expandPickUpDeliverySection);
        //     actionLib.verifyElementPresent(enquiryPage.textBoxPickUpAddress1);
        //     enquiryPage.addEnquiryPickUpDelivery(dataEnquiry.pickupAddress);
        //     actionLib.click(enquiryPage.expandPickUpDeliverySection);
        // });

        it('test_addexportenquiry_5 : should be able to add enquiry rate request section', function () {
            
                actionLib.click(enquiryPage.expandRateRequestSection);
                actionLib.verifyElementPresent(enquiryPage.dropDownVendor);
                //-- if 5th attribute is none (as it opens a new window) then make the attributes following it also none
                //-- Added 1 charge under charge detail pop up as final attribute is selected as yes
                enquiryPage.addEnquiryRateRequest(dataEnquiry.rateRequest);
                actionLib.click(enquiryPage.btnChargeDetailSave);
                actionLib.verifyElementPresent(enquiryPage.expandRateRequestSection);
                actionLib.click(enquiryPage.expandRateRequestSection);
        });

        it('test_addexportenquiry_6 : should be able to save enquiry successfully', function () {

            actionLib.verifyElementPresent(enquiryPage.btnSave);
            actionLib.click(enquiryPage.btnSave);
            actionLib.click(enquiryPage.btnPopUpOk);
            actionLib.click(actionLib.menuTasks);
            actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
            actionLib.click(actionLib.subMenuMyTasks);
            actionLib.verifyElementPresent(enquiryPage.linkEnquiry);
            //--second attribute value other than none - get the enquiry count on the my task page
            // and verify it is 1 more than the previous enquiry count.
            actionLib.verifySplitCountOfLocator(enquiryPage.linkEnquiry, "Yes");

        });

        it('test_addexportenquiry_7 : verify added enquiry few data values', function () {

            actionLib.click(enquiryPage.linkEnquiry);
            efsLib.fillTextInTableColumn(dataEnquiry.enquiryTableDataXpathTag, 2, 2, globalData.globalData.customerName);
            efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiryTableDataXpathTag, 1, 2, globalData.globalData.customerName);
            efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiryTableDataXpathTag, 1, 4, strEnquiryReceived);
            efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiryTableDataXpathTag, 1, 5, strQuoteByDate);
            efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiryTableDataXpathTag, 1, 7, dataEnquiry.enquiry.origin);
            efsLib.verifySearchTextInTableRowCol(dataEnquiry.enquiryTableDataXpathTag, 1, 8, dataEnquiry.enquiry.destination);
        });

        it('test_addexportenquiry_8 : should be able to update and save enquiry successfully', function () {

            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
            actionLib.verifyElementPresent(enquiryPage.btnEdit);
            actionLib.click(enquiryPage.btnEdit);
            actionLib.setText(enquiryPage.dropDownCommodityGrp, dataEnquiry.updatedCommodityGrp);
            actionLib.click(enquiryPage.btnUpdate);
            actionLib.click(enquiryPage.btnPopUpOk);
            actionLib.click(actionLib.menuTasks);
            actionLib.click(actionLib.subMenuMyTasks);
            actionLib.click(enquiryPage.linkEnquiry);
            efsLib.fillTextInTableColumn(dataEnquiry.enquiryTableDataXpathTag, 2, 2, globalData.globalData.customerName);
            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
            actionLib.click(enquiryPage.btnEdit);
            reqElement = actionLib.getAttributeValue(enquiryPage.dropDownCommodityGrp, 'value');
            expect(reqElement).toEqual(dataEnquiry.updatedCommodityGrp);
        });

        it('test_demofeedbackpointsbrd_point11 : Chargeable weight should be greatest of gross weight and volume weight', function () {
            enquiryPage.veryfyChargeableWeight(dataEnquiry);
        });

        it('test_demofeedbackpointsbrd_point10 : should be able to check total data of each row in dimension table', function () {
            actionLib.click(enquiryPage.expandDimensionsSection);
            actionLib.click(enquiryPage.uiSwitchEnabled);
            enquiryPage.verifyTotalValues(dataEnquiry);
        });

    afterAll(function () {
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});