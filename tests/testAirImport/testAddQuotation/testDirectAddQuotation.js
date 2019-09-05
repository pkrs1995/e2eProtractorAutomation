var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var addQuotationPage = require('../../../pages/pageAirImport/pageQuotation/pageAddQuotation.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var customerCommonElementPage = require('../../../pages/pageAddCustomer/pageAddCustomer.js');
var addCustomerData = require('../../../testdata/masters/eCRM/customer/customer.json');
var enquiryPage = require('../../../pages/pageGlobal/pageGlobal.js');
var enquiryData = require('../../../testdata/dataGlobal/quotationGlobalData.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');

describe('test import direct add quotation functionality of newage', function () {
    var strEnquiryReceived;
    var strQuoteByDate;
    var dataAddenquiry;
    var dataAddCutomer
    var directCustomerName;

    beforeAll(function () {
        var testSpecName = "Import Direct Add Quotation";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataAddCutomer = addCustomerData.addCustomer[0];
        dataAddenquiry = enquiryData.quotation[0];
    });

    it('test_directAddimportquotation_1 : should be able to navigate to add quotation page from Direct link', function () {

        actionLib.verifyElementPresent(enquiryPage.directQuotationLink);
        //----second attribute value none - get the quotation count on the my task page        
        actionLib.click(enquiryPage.directQuotationLink);
        directCustomerName = "AddCustomer" + actionLib.getTodayTime();
        efsLib.clickAddCustomerTable(directCustomerName);
        customerCommonElementPage.addImportCustomer(dataAddCutomer.customer);
        customerCommonElementPage.addCustomerAddress(dataAddCutomer.address);
        actionLib.verifyElementPresent(customerCommonElementPage.btnSave);
        actionLib.click(customerCommonElementPage.btnSave);
        actionLib.verifyElementPresent(customerCommonElementPage.btnPopUpOk);
        actionLib.click(customerCommonElementPage.btnPopUpOk);

    });

    it('test_addDirectimportquotation_2 : should be able to add data on quotation page', function () {
        var serviceName = "Import";
        actionLib.verifyElementPresent(enquiryPage.dropDownCustomer);
        enquiryPage.addDirectQuotation(dataAddenquiry.directQuotation);
        actionLib.click(addQuotationPage.btnSubmit);
    });

    it('test_addDirectimportquotation_3 : should be able to add data on quotation charge carrier section', function () {

        actionLib.click(enquiryPage.expandCarrierCharge);
        actionLib.verifyElementPresent(enquiryPage.dropDownCarrier);
        enquiryPage.addDirectQuotationCarrierCharge(dataAddenquiry.carrierCharge);
    });

    it('test_addDirectimportQuotationDimension_4 : should be able to add Quotation dimensions section', function () {
        actionLib.click(enquiryPage.expandDimensionsSection);
        actionLib.verifyElementPresent(enquiryPage.textBoxNoOfPiecesQuotation);
        enquiryPage.addDirectQuotationDimensions(dataAddenquiry.dimensions);
        actionLib.click(enquiryPage.expandDimensionsSection);
    });

    it('test_addDirectimportQuotation_5 : should be able to add Quotation pick up / delivery section', function () {
        actionLib.click(enquiryPage.expandPickUpDeliverySectionQuotation);
        actionLib.verifyElementPresent(enquiryPage.textBoxPickUpAddress1Quotation);
        enquiryPage.addDirectImportQuotationPickUpDelivery(dataAddenquiry.pickUpDelivery);
        actionLib.click(enquiryPage.expandPickUpDeliverySectionQuotation);
    });
    it('test_addDirectImportquotation_6 : should be able to add data on quotation air notes section', function () {

        actionLib.verifyElementPresent(addQuotationPage.expandAirNotes);
        actionLib.click(addQuotationPage.expandAirNotes);
        actionLib.verifyElementPresent(addQuotationPage.textAreaNotes);
        addQuotationPage.addQuotationAirNotes(dataAddenquiry.directQuotation);
        actionLib.click(addQuotationPage.expandAirNotes);
    });

    it('test_addDirectImportquotation_7 : should be able to save quotation successfully', function () {

        actionLib.verifyElementPresent(addQuotationPage.btnSave);
        actionLib.click(addQuotationPage.btnSave);
        actionLib.verifyElementPresent(addQuotationPage.btnPopUpOk);
        actionLib.click(addQuotationPage.btnPopUpOk);

        actionLib.click(actionLib.menuTasks);
        actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
        actionLib.click(actionLib.subMenuMyTasks);

    });

    afterAll(function () {
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
});

});

