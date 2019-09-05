var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var quotationPage = require('../../../pages/pageAirExport/pageQuotation/pageQuotation.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var customerCommonElementPage = require('../../../pages/pageAddCustomer/pageAddCustomer.js');
var addCustomerData = require('../../../testdata/masters/eCRM/customer/customer.json');
var enquiryPage = require('../../../pages/pageGlobal/pageGlobal.js');
var enquiryData = require('../../../testdata/dataGlobal/quotationGlobalData.json');
var demoFeedbackPointsData = require('../../../testdata/dataDemoFeedbackPoints/dataDemoFeedbackPoints.json');
var demoFeedbackPointsPage = require('../../../pages/pageDemoFeedbackPoints/pageDemoFeedbackPoints.js');
var topBar = require('../../../pages/pageNavigation/topBar.js');


describe('test Export direct add quotation functionality of newage', function () {
    var strEnquiryReceived;
    var strQuoteByDate;
    var attachmentUpload = "../testdata/dataFiles/agentTemplate.xlsx";
    var directCustomerName;
    var overDimensionText;
    var dimensionDataVars;

    beforeAll(function () {
        var testSpecName = "Export Direct Add Quotation";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataAddCutomer = addCustomerData.addCustomer[0];
        dataAddenquiry = enquiryData.quotation[0];
    });

    it('test_directAddExportquotation_1 : should be able to navigate to add quotation page from Direct link', function () {

        actionLib.verifyElementPresent(enquiryPage.directQuotationLink);
        //----second attribute value none - get the quotation count on the my task page        
        actionLib.click(enquiryPage.directQuotationLink);
        directCustomerName = "AddCustomer" + actionLib.getTodayTime();
        efsLib.clickAddCustomerTable(directCustomerName);
        customerCommonElementPage.addExportCustomer(dataAddCutomer.customer);
        customerCommonElementPage.addCustomerAddress(dataAddCutomer.address);
        actionLib.verifyElementPresent(customerCommonElementPage.btnSave);
        actionLib.click(customerCommonElementPage.btnSave);
        actionLib.verifyElementPresent(customerCommonElementPage.btnPopUpOk);
        actionLib.click(customerCommonElementPage.btnPopUpOk);

    });

    it('test_addDirectExportquotation_2 : should be able to add data on quotation page', function () {
        var serviceName = "Export";
        actionLib.verifyElementPresent(enquiryPage.dropDownCustomer);
        enquiryPage.addDirectQuotation(dataAddenquiry.directQuotation);
        actionLib.click(quotationPage.btnSubmit);
    });

    it('test_addDirectExportquotation_3 : should be able to add data on quotation charge carrier section', function () {

        actionLib.click(enquiryPage.expandCarrierCharge);
        actionLib.verifyElementPresent(enquiryPage.dropDownCarrier);
        enquiryPage.addDirectQuotationCarrierCharge(dataAddenquiry.carrierCharge);
        actionLib.click(enquiryPage.expandCarrierCharge);
    });

    // it('test_demofeedbackpointsbrd_point7_1 : verify that overdimension textbox updates once enter data in dimension section in centimeter', function () {

    //     actionLib.click(enquiryPage.expandDimensionsSection);
    //     actionLib.verifyElementPresent(enquiryPage.textBoxNoOfPiecesQuotation);
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.higherLengthInCm,
    //         "width":demoFeedbackPointsData.quotationDimensionData.higherWidthInCm,
    //         "height":demoFeedbackPointsData.quotationDimensionData.higherHeightInCm,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.higherLengthInCm,
    //         "width":demoFeedbackPointsData.quotationDimensionData.lessWidthInCm,
    //         "height":demoFeedbackPointsData.quotationDimensionData.lessHeightInCm,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.lessLengthInCm,
    //         "width":demoFeedbackPointsData.quotationDimensionData.higherWidthInCm,
    //         "height":demoFeedbackPointsData.quotationDimensionData.lessHeightInCm,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.lessLengthInCm,
    //         "width":demoFeedbackPointsData.quotationDimensionData.lessWidthInCm,
    //         "height":demoFeedbackPointsData.quotationDimensionData.higherHeightInCm,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.lessLengthInCm,
    //         "width":demoFeedbackPointsData.quotationDimensionData.lessWidthInCm,
    //         "height":demoFeedbackPointsData.quotationDimensionData.lessHeightInCm,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     var overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("NO");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.equalLengthInCm,
    //         "width":demoFeedbackPointsData.quotationDimensionData.equalWidthInCm,
    //         "height":demoFeedbackPointsData.quotationDimensionData.equalHeightInCm,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("NO");
    //     });
    //     actionLib.click(enquiryPage.expandDimensionsSection);

    //     actionLib.verifyElementPresent(quotationPage.btnSave);
    //     actionLib.click(quotationPage.btnSave);
    //     actionLib.verifyElementPresent(quotationPage.btnPopUpOk);
    //     actionLib.click(quotationPage.btnPopUpOk);
    // });

    // it('test_demofeedbackpointsbrd_point7_2 : verify that overdimension data is available on detail page as per added dimension data', function () {

    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textOverDimensionDetailScreen);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("NO");
    //     });
    // });

    // it('test_demofeedbackpointsbrd_point7_3 : verify that overdimension textbox updates once enter data in dimension section in Inches', function () {

    //     actionLib.verifyElementPresent(quotationPage.btnEdit);
    //     actionLib.click(quotationPage.btnEdit);

    //     actionLib.click(enquiryPage.expandDimensionsSection);
    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.uiSwitchDimensionUnit);
    //     actionLib.click(demoFeedbackPointsPage.uiSwitchDimensionUnit);
        
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.lessLengthInInch,
    //         "width":demoFeedbackPointsData.quotationDimensionData.lessWidthInInch,
    //         "height":demoFeedbackPointsData.quotationDimensionData.lessHeightInInch,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     var overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("NO");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.higherLengthInInch,
    //         "width":demoFeedbackPointsData.quotationDimensionData.lessWidthInInch,
    //         "height":demoFeedbackPointsData.quotationDimensionData.lessHeightInInch,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.lessLengthInInch,
    //         "width":demoFeedbackPointsData.quotationDimensionData.higherWidthInInch,
    //         "height":demoFeedbackPointsData.quotationDimensionData.lessHeightInInch,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.lessLengthInInch,
    //         "width":demoFeedbackPointsData.quotationDimensionData.lessWidthInInch,
    //         "height":demoFeedbackPointsData.quotationDimensionData.higherHeightInInch,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.equalLengthInInch,
    //         "width":demoFeedbackPointsData.quotationDimensionData.equalWidthInInch,
    //         "height":demoFeedbackPointsData.quotationDimensionData.equalHeightInInch,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("NO");
    //     });
    //     dimensionDataVars = {
    //         "noOfPieces":demoFeedbackPointsData.quotationDimensionData.noOfPieces,
    //         "length":demoFeedbackPointsData.quotationDimensionData.higherLengthInInch,
    //         "width":demoFeedbackPointsData.quotationDimensionData.higherWidthInInch,
    //         "height":demoFeedbackPointsData.quotationDimensionData.higherHeightInInch,
    //         "dimensionGrossWeight":demoFeedbackPointsData.quotationDimensionData.dimensionGrossWeight,
    //     }
    //     enquiryPage.addDirectQuotationDimensions(dimensionDataVars);
    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textBoxOverDimension);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    //     actionLib.click(enquiryPage.expandDimensionsSection);

    //     actionLib.verifyElementPresent(quotationPage.btnUpdate);
    //     actionLib.click(quotationPage.btnUpdate);
    //     actionLib.verifyElementPresent(quotationPage.btnPopUpOk);
    //     actionLib.click(quotationPage.btnPopUpOk);
    // });

    // it('test_demofeedbackpointsbrd_point7_4 : verify that overdimension textbox is available on detail page as per updated dimension data', function () {

    //     overDimensionText = actionLib.getTextByLocator(demoFeedbackPointsPage.textOverDimensionDetailScreen);
    //     overDimensionText.then(function(val){
    //         expect(val).toEqual("YES");
    //     });
    // });

    it('test_addDirectExportQuotationDimension_4 : should be able to add Quotation dimensions section', function () {
    
        actionLib.click(enquiryPage.expandDimensionsSection);
        actionLib.verifyElementPresent(enquiryPage.textBoxNoOfPiecesQuotation);
        enquiryPage.addDirectQuotationDimensions(dataAddenquiry.dimensions);
        actionLib.click(enquiryPage.expandDimensionsSection);
    });

    it('test_addDirectExportQuotation_5 : should be able to add Quotation pick up / delivery section', function () {
        actionLib.click(enquiryPage.expandPickUpDeliverySectionQuotation);
        actionLib.verifyElementPresent(enquiryPage.textBoxPickUpAddress1Quotation);
        enquiryPage.addDirectImportQuotationPickUpDelivery(dataAddenquiry.pickUpDelivery);
        actionLib.click(enquiryPage.expandPickUpDeliverySectionQuotation);
    });
    
    it('test_addDirectExportquotation_6 : should be able to add data on quotation air notes section', function () {

        actionLib.verifyElementPresent(quotationPage.expandAirNotes);
        actionLib.click(quotationPage.expandAirNotes);
        actionLib.verifyElementPresent(quotationPage.textAreaNotes);
        quotationPage.addQuotationAirNotes(dataAddenquiry.directQuotation);
        actionLib.click(quotationPage.expandAirNotes);
    });

    it('test_addDirectExportquotation_7 : should be able to save quotation successfully', function () {

        actionLib.verifyElementPresent(quotationPage.btnSave);
        actionLib.click(quotationPage.btnSave);
        actionLib.verifyElementPresent(quotationPage.btnPopUpOk);
        actionLib.click(quotationPage.btnPopUpOk);
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

