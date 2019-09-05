var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var quotationPage = require('../../../pages/pageAirExport/pageQuotation/pageQuotation.js');
var generateQuotationReportPage = require('../../../pages/pageAirExport/pageGenerateReports/pageGenerateQuotationReports.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var quotationData = require('../../../testdata/dataAirExport/dataQuotation/dataQuotation.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');

describe('test export generate quotation reports functionality of newage', function() {
    var fs = require('fs');
    var dataEnquiry;
    var dataQuotation;
    beforeAll(function(){
        var testSpecName = "TestGenerateQuotationReports";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry=enquiryData.addEnquiry[0];
        dataQuotation = quotationData.addQuotation[0];
        // This will be required while downloading quotation reports
        // fs.mkdirSync("./downloadedFiles");
    });
	
    it('test_generateQuotationreport_1 : should be able to navigate to generate quotation report page', function() {
        
        actionLib.verifyElementPresent(quotationPage.linkQuotation);
        actionLib.click(quotationPage.linkQuotation);
        efsLib.fillTextInTableColumn(dataQuotation.quotationTableDataXpathTag, 2, 2, 
                                        globalData.globalData.customerName);
        efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
        actionLib.verifyElementPresent(generateQuotationReportPage.btnReports);
    });

    it('test_generateQuotationreport_2 : should be able to preview quotation report successfully', function() {
        
        var reportVariables = {
            "reportSequenceNo":"1"
        }
        generateQuotationReportPage.previewQuotationReport(reportVariables);
        actionLib.explicitWait(2000);
        actionLib.switchToWindow(1);
        // //These lines are required to verify in without headless mode.
        // browser.ignoreSynchronization = true;
        // actionLib.verifyElementPresent(generateQuotationReportPage.frameQutationPreview);
        browser.close();
        actionLib.switchToWindow(0);
        actionLib.verifyElementPresent(generateQuotationReportPage.btnGeneratePopUpCancel);
        actionLib.click(generateQuotationReportPage.btnGeneratePopUpCancel);
        actionLib.explicitWait(5000);
    });

    it('test_generateQuotationreport_3 : should be able to preview quotation with estimated value report successfully', function() {
        
        var reportVariables = {
            "reportSequenceNo":"2"
        }
        generateQuotationReportPage.previewQuotationReport(reportVariables);
        actionLib.explicitWait(2000);
        actionLib.switchToWindow(1);
        // //These lines are required to verify in without headless mode.
        // browser.ignoreSynchronization = false;
        // actionLib.verifyElementPresent(generateQuotationReportPage.frameQutationPreview);
        browser.close();
        actionLib.switchToWindow(0);
        actionLib.verifyElementPresent(generateQuotationReportPage.btnGeneratePopUpCancel);
        actionLib.click(generateQuotationReportPage.btnGeneratePopUpCancel);
        actionLib.explicitWait(5000);
    });
    
    // //This testcase is working file without headless but not working in headless-- so commented
    // it('test_generateQuotationreport_4 : should be able to generate quotation report successfully', function() {

    //     var quotationFileName = "QUOTATION_WITHOUT_ESTIMATION";
    //     var dirs = "downloadedFiles/";

    //     var reportVariables = {
    //         "reportSequenceNo":"1"
    //     }
    //     generateQuotationReportPage.generateQuotationReport(reportVariables);
    //     // actionLib.verifyElementPresent(generateQuotationReportPage.msgDownLoadProgress);
    //     actionLib.verifyElementText(generateQuotationReportPage.msgDownLoadProgress, "none",
    //                                 "Your Download is in progress");
    //     actionLib.verifyElementPresent(generateQuotationReportPage.btnGeneratePopUpCancel);
    //     actionLib.click(generateQuotationReportPage.btnGeneratePopUpCancel);
    //     actionLib.verifyAndDeleteDownloadedFile(dirs, quotationFileName);
    // });

    // //This testcase is working file without headless but not working in headless-- so commented
    // it('test_generateQuotationreport_5 : should be able to generate quotation with estimated value report successfully', function() {

    //     var dirs = "downloadedFiles/";
    //     var quotationWithEstimationFileName = "QUOTATION_WITH_ESTIMATION";
    //     var reportVariables = {
    //         "reportSequenceNo":"2"
    //     }
    //     generateQuotationReportPage.generateQuotationReport(reportVariables);
    //     // actionLib.verifyElementPresent(generateQuotationReportPage.msgDownLoadProgress);
    //     actionLib.verifyElementText(generateQuotationReportPage.msgDownLoadProgress, "none",
    //                                 "Your Download is in progress");
    //     actionLib.verifyElementPresent(generateQuotationReportPage.btnGeneratePopUpCancel);
    //     actionLib.click(generateQuotationReportPage.btnGeneratePopUpCancel);
    //     actionLib.verifyAndDeleteDownloadedFile(dirs, quotationWithEstimationFileName);
    // });

    afterAll(function(){
        // fs.rmdirSync("./downloadedFiles");
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});