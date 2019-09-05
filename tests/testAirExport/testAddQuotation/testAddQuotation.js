var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var enquiryPage = require('../../../pages/pageAirExport/pageEnquiry/pageEnquiry.js');
var quotationPage = require('../../../pages/pageAirExport/pageQuotation/pageQuotation.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var quotationData = require('../../../testdata/dataAirExport/dataQuotation/dataQuotation.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');

describe('test export add quotation functionality of newage', function () {
    var reqElement;
    var strEnquiryReceived;
    var strQuoteByDate;
    var attachmentUpload = "../../testdata/dataFiles/agentTemplate.xlsx";
    var hourMinTime;
    var todayDate;
    var dataEnquiry;
    var dataQuotation;
    
    
    beforeAll(function(){
        var testSpecName = "TestAddQuotation";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry=enquiryData.addEnquiry[0];
        dataQuotation =quotationData.addQuotation[0];
    });

        it('test_addexportquotation_1 : should be able to navigate to add quotation page', function () {

            actionLib.verifyElementPresent(quotationPage.linkQuotation);
            //----second attribute value none - get the quotation count on the my task page        
            actionLib.verifySplitCountOfLocator(quotationPage.linkQuotation, "none");
            actionLib.verifyElementPresent(enquiryPage.linkEnquiry);
            actionLib.click(enquiryPage.linkEnquiry);
            efsLib.fillTextInTableColumn(dataEnquiry.enquiryTableDataXpathTag, 2, 2, globalData.globalData.customerName);
            expect(element(by.xpath("//input[@data-id='getEnquiryHeadArray_customerName']")).
                    getAttribute('data-id')).toEqual(browser.driver.switchTo().activeElement().
                    getAttribute('data-id'));
            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
            actionLib.verifyElementPresent(quotationPage.btnCreateQuotation);
        });

        it('test_addexportquotation_2 : should be able to add data on quotation page', function () {

            actionLib.click(quotationPage.btnCreateQuotation);
            actionLib.verifyElementPresent(quotationPage.dropDownCustomer);
            quotationPage.addQuotation(dataQuotation.quotation);
            actionLib.click(quotationPage.btnSubmit);
        });

        it('test_addexportquotation_3 : should be able to add data on quotation charge carrier section', function () {

            actionLib.click(quotationPage.expandCarrierCharge);
            actionLib.verifyElementPresent(quotationPage.dropDownCarrier);
            quotationPage.addQuotationCarrierCharge(dataQuotation.quotationCarrier);
            actionLib.verifyElementPresent(quotationPage.dropDownCarrier);
            actionLib.click(quotationPage.expandCarrierCharge);
        });

        it('test_addexportquotation_4 : should be able to add data on quotation air notes section', function () {

            actionLib.verifyElementPresent(quotationPage.expandAirNotes);
            actionLib.click(quotationPage.expandAirNotes);
            actionLib.verifyElementPresent(quotationPage.textAreaNotes);
            quotationPage.addQuotationAirNotes(dataQuotation.airNotes.notes);
            actionLib.click(quotationPage.expandAirNotes);
        });

        it('test_addexportquotation_5 : should be able to check total data of each row in dimension table', function () {
            actionLib.click(quotationPage.expandDimensionsSection);
            actionLib.click(quotationPage.uiSwitchEnabled);
            quotationPage.verifyTotalValues(dataEnquiry.dimensions);
        });

        it('test_addexportquotation_6 : should be able to save quotation successfully', function () {

            actionLib.verifyElementPresent(quotationPage.btnSave);
            actionLib.click(quotationPage.btnSave);
            actionLib.verifyElementPresent(quotationPage.btnPopUpOk);
            actionLib.click(quotationPage.btnPopUpOk);
            actionLib.click(actionLib.menuTasks);
            actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
            actionLib.click(actionLib.subMenuMyTasks);
            actionLib.verifyElementPresent(quotationPage.linkQuotation);
            //--second attribute value other than none - get the quotation count on the my task page
            // and verify it is 1 more than the previous shipment count.
            actionLib.verifySplitCountOfLocator(quotationPage.linkQuotation, "Yes");
        });

        it('test_addexportquotation_7 : should be able to approve quotation', function () {

            actionLib.click(quotationPage.linkQuotation);
            efsLib.fillTextInTableColumn(dataQuotation.quotationTableDataXpathTag, 2, 2, globalData.globalData.customerName);
            efsLib.verifySearchTextInTableRowCol(dataQuotation.quotationTableDataXpathTag, 1, 2, globalData.globalData.customerName);
            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
            actionLib.verifyElementPresent(quotationPage.btnApprove);
            actionLib.click(quotationPage.btnApprove);
            actionLib.verifyElementPresent(quotationPage.btnApproveYes);
            actionLib.click(quotationPage.btnApproveYes);
            actionLib.verifyElementPresent(quotationPage.imageApprovedQuotation);
        });

        it('test_demofeedbackpointsbrd_point20_1 : verify that time also displayed with date in approved quotation image', function () {
            var loggedUserName;
            var imageTags;
            var dateObj = new Date();
            var todayHour = dateObj.getHours();
            var todayMin = dateObj.getMinutes();
            if (todayHour < 10) {
                todayHour = '0' + todayHour;
            }
            if (todayMin < 10) {
                todayMin = '0' + todayMin;
            }       
            hourMinTime = todayHour + ':' + todayMin;
            todayDate = actionLib.getTodayDate();

            reqElement = actionLib.getTextByLocator(quotationPage.textLoggedUserName);
            reqElement.then(function(val){
                loggedUserName = val.toUpperCase();
                imageTags = [todayDate + " " + hourMinTime, loggedUserName];
                quotationPage.verifyImageApprovedDetails(imageTags);    
            });
        });

        it('test_addexportquotation_8 : should be able to update and save quotation successfully', function () {
            
            actionLib.verifyElementPresent(quotationPage.btnEdit);
            actionLib.click(quotationPage.btnEdit);
            actionLib.verifyElementPresent(quotationPage.textBoxGrossWeight);
            actionLib.setText(quotationPage.textBoxGrossWeight, dataQuotation.updatedGrossWtVal);
            actionLib.setText(quotationPage.textBoxAttention, dataQuotation.updatedAttentionVal);
            actionLib.click(quotationPage.btnUpdate);
            actionLib.click(quotationPage.btnPopUpOk);
            actionLib.click(quotationPage.btnEdit);
            reqElement = actionLib.getAttributeValue(quotationPage.textBoxGrossWeight, 'value');
            expect(reqElement).toEqual(dataQuotation.updatedGrossWtVal);
            reqElement = actionLib.getAttributeValue(quotationPage.textBoxAttention, 'value');
            expect(reqElement).toEqual(dataQuotation.updatedAttentionVal);
        });

        it('test_demofeedbackpointsbrd_point20_2 : verify that correct approved time displayed once user update quotation', function () {
            
            actionLib.verifyElementPresent(quotationPage.btnUpdate);
            actionLib.click(quotationPage.btnUpdate);
            actionLib.verifyElementPresent(quotationPage.btnPopUpOk);
            actionLib.click(quotationPage.btnPopUpOk);
            reqElement = actionLib.getTextByLocator(quotationPage.textLoggedUserName);
            reqElement.then(function(val){
                loggedUserName = val.toUpperCase();
                imageTags = [todayDate + " " + hourMinTime, loggedUserName];
                quotationPage.verifyImageApprovedDetails(imageTags);    
            });
        });

    afterAll(function () {
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});

